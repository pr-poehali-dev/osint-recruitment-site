"""
Управление отзывами OSINT-РЭР.
GET — список одобренных отзывов (публично) или всех (для админа).
POST — добавить отзыв (статус pending) или модерация (approve/reject/delete с паролем).
"""
import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


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
        cur.close()
        conn.close()
        reviews = [
            {
                "id": r[0], "name": r[1], "role": r[2], "text": r[3],
                "rating": r[4], "status": r[5], "created_at": r[6].isoformat() if r[6] else None,
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"reviews": reviews})}

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
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "id": new_id})}

        if not is_admin:
            return {"statusCode": 403, "headers": cors, "body": json.dumps({"error": "Неверный пароль"})}

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
