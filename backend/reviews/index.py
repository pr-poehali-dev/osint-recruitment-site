"""
Управление отзывами OSINT-РЭР.
GET — список одобренных отзывов (публично) или всех (для админа).
POST — добавить отзыв (статус pending) или модерация (approve/reject/delete с паролем).
"""
import json
import os
import smtplib
import threading
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def notify_email(name: str, role: str, text: str, rating: int):
    email_from = os.environ.get("EMAIL_FROM", "")
    email_password = os.environ.get("EMAIL_PASSWORD", "")
    if not email_from or not email_password:
        return
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Новый отзыв на модерацию — OSINT-РЭР"
    msg["From"] = email_from
    msg["To"] = email_from
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a0b; color: #fff; padding: 30px; border-radius: 8px;">
        <h2 style="color: #fff;">Новый отзыв на модерацию</h2>
        <p style="color:#aaa;">Имя: <b style="color:#fff;">{name}</b></p>
        <p style="color:#aaa;">Должность: <b style="color:#fff;">{role}</b></p>
        <p style="color:#aaa;">Оценка: <b style="color:#fff;">{rating}/5</b></p>
        <p style="color:#aaa;">Текст:</p>
        <p style="color:#fff; background:#161618; padding:14px; border-radius:6px;">{text}</p>
        <p style="color:#555; font-size:12px; margin-top:20px;">Зайдите в админ-панель /admin, чтобы одобрить или скрыть отзыв.</p>
    </div>
    """
    msg.attach(MIMEText(html, "html"))
    try:
        with smtplib.SMTP_SSL("smtp.yandex.ru", 465, timeout=20) as server:
            server.login(email_from, email_password)
            server.sendmail(email_from, email_from, msg.as_string())
    except Exception:
        pass


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    }

    method = event.get("httpMethod", "GET")

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    headers = event.get("headers") or {}
    admin_pwd = os.environ.get("ADMIN_PASSWORD", "")
    sent_pwd = headers.get("X-Admin-Password") or headers.get("x-admin-password") or ""
    is_admin = bool(admin_pwd) and sent_pwd == admin_pwd

    if method == "GET":
        params = event.get("queryStringParameters") or {}
        want_all = params.get("all") == "1" and is_admin
        conn = get_conn()
        cur = conn.cursor()
        if want_all:
            cur.execute("SELECT id, name, role, text, rating, status, created_at FROM reviews ORDER BY created_at DESC")
        else:
            cur.execute("SELECT id, name, role, text, rating, status, created_at FROM reviews WHERE status = 'approved' ORDER BY created_at DESC")
        rows = cur.fetchall()
        cur.execute("SELECT value FROM settings WHERE key = 'applications_count'")
        cnt_row = cur.fetchone()
        applications_count = int(cnt_row[0]) if cnt_row and str(cnt_row[0]).isdigit() else 1247
        cur.close()
        conn.close()
        reviews = [
            {
                "id": r[0], "name": r[1], "role": r[2], "text": r[3],
                "rating": r[4], "status": r[5], "created_at": r[6].isoformat() if r[6] else None,
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"reviews": reviews, "applications_count": applications_count})}

    if method == "POST":
        try:
            body = json.loads(event.get("body") or "{}")
        except Exception:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Bad JSON"})}

        action = body.get("action", "create")

        if action == "create":
            name = (body.get("name") or "").strip()[:100]
            role = (body.get("role") or "").strip()[:150]
            text = (body.get("text") or "").strip()
            rating = int(body.get("rating") or 5)
            rating = max(1, min(5, rating))
            if not name or not text:
                return {"statusCode": 422, "headers": cors, "body": json.dumps({"error": "Имя и текст обязательны"})}
            name = name.replace("'", "''")
            role = role.replace("'", "''")
            text_esc = text.replace("'", "''")
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO reviews (name, role, text, rating, status) VALUES ('{name}', '{role}', '{text_esc}', {rating}, 'pending') RETURNING id"
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
            conn.close()
            t = threading.Thread(target=notify_email, args=(name, role, text, rating), daemon=True)
            t.start()
            t.join(timeout=22)
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "id": new_id})}

        if not is_admin:
            return {"statusCode": 403, "headers": cors, "body": json.dumps({"error": "Неверный пароль"})}

        if action == "set_count":
            count = int(body.get("count") or 0)
            count = max(0, min(99999999, count))
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO settings (key, value) VALUES ('applications_count', '{count}') "
                f"ON CONFLICT (key) DO UPDATE SET value = '{count}'"
            )
            conn.commit()
            cur.close()
            conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "count": count})}

        review_id = int(body.get("id") or 0)
        if review_id <= 0:
            return {"statusCode": 422, "headers": cors, "body": json.dumps({"error": "Нужен id"})}

        conn = get_conn()
        cur = conn.cursor()
        if action == "approve":
            cur.execute(f"UPDATE reviews SET status = 'approved' WHERE id = {review_id}")
        elif action == "reject":
            cur.execute(f"UPDATE reviews SET status = 'rejected' WHERE id = {review_id}")
        elif action == "delete":
            cur.execute(f"DELETE FROM reviews WHERE id = {review_id}")
        else:
            cur.close()
            conn.close()
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Неизвестное действие"})}
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}