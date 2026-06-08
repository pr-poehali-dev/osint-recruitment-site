"""
Отправка заявки с сайта OSINT-РЭР: сохранение в БД + Telegram + Email + автоответ. v12
Принимает имя, телефон, специальность, email (опционально).
"""
import json
import os
import urllib.request
import urllib.parse
import smtplib
import threading
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def save_to_db(name: str, phone: str, specialty: str):
    dsn = os.environ.get("DATABASE_URL", "")
    if not dsn:
        return
    n = name.replace("'", "''")
    p = phone.replace("'", "''")
    s = specialty.replace("'", "''")
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO applications (name, phone, specialty) VALUES ('{n}', '{p}', '{s}')"
    )
    conn.commit()
    cur.close()
    conn.close()


def send_email(name: str, phone: str, specialty: str, client_email: str):
    email_from = os.environ.get("EMAIL_FROM", "")
    email_password = os.environ.get("EMAIL_PASSWORD", "")
    if not email_from or not email_password:
        return

    extra = ""
    if client_email:
        extra = f'<tr><td style="padding: 10px 0; color: #999;">Email:</td><td style="padding: 10px 0; color: #fff; font-weight: bold;">{client_email}</td></tr>'

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Новая заявка — OSINT-РЭР"
    msg["From"] = email_from
    msg["To"] = email_from
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0b; color: #ffffff; padding: 32px; border-radius: 10px;">
        <h2 style="color: #ffffff; margin-bottom: 20px;">Новая заявка — OSINT-РЭР</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #999; width: 140px;">Имя:</td><td style="padding: 10px 0; color: #fff; font-weight: bold;">{name}</td></tr>
            <tr><td style="padding: 10px 0; color: #999;">Телефон:</td><td style="padding: 10px 0; color: #fff; font-weight: bold;">{phone}</td></tr>
            <tr><td style="padding: 10px 0; color: #999;">Специальность:</td><td style="padding: 10px 0; color: #fff; font-weight: bold;">{specialty}</td></tr>
            {extra}
        </table>
        <p style="margin-top: 20px; color: #555; font-size: 12px;">Источник: сайт OSINT-РЭР</p>
    </div>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465, timeout=20) as server:
        server.login(email_from, email_password)
        server.sendmail(email_from, email_from, msg.as_string())

        # Автоответ кандидату
        if client_email and "@" in client_email:
            reply = MIMEMultipart("alternative")
            reply["Subject"] = "Ваша заявка принята — OSINT-РЭР"
            reply["From"] = email_from
            reply["To"] = client_email
            reply_html = f"""
            <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0a0a0b; color: #ffffff; padding: 36px; border-radius: 10px;">
                <h2 style="color: #ffffff; margin-bottom: 16px;">Здравствуйте, {name}!</h2>
                <p style="color: #ccc; line-height: 1.7; font-size: 15px;">Спасибо за вашу заявку в подразделение <b style="color:#fff;">OSINT-РЭР</b>. Мы получили её и уже обрабатываем.</p>
                <p style="color: #ccc; line-height: 1.7; font-size: 15px;">Наш специалист свяжется с вами по телефону <b style="color:#fff;">{phone}</b> в течение 24 часов, ответит на все вопросы и расскажет о следующих шагах.</p>
                <div style="margin: 24px 0; padding: 18px; background: #161618; border-radius: 8px; border-left: 3px solid #dc2626;">
                    <p style="color:#aaa; margin:0; font-size:13px;">Выбранное направление:</p>
                    <p style="color:#fff; margin:6px 0 0; font-weight:bold; font-size:16px;">{specialty}</p>
                </div>
                <p style="color: #888; line-height: 1.6; font-size: 13px;">Срочный вопрос? Напишите в Telegram: <a href="https://t.me/Ares_deavel7" style="color:#ef4444;">@Ares_deavel7</a></p>
                <p style="margin-top: 24px; color: #555; font-size: 12px;">С уважением, команда OSINT-РЭР</p>
            </div>
            """
            reply.attach(MIMEText(reply_html, "html"))
            try:
                server.sendmail(email_from, client_email, reply.as_string())
            except Exception:
                pass


def do_async(name: str, phone: str, specialty: str, client_email: str):
    try:
        save_to_db(name, phone, specialty)
    except Exception:
        pass
    try:
        send_email(name, phone, specialty, client_email)
    except Exception:
        pass


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Bad JSON"})}

    name      = body.get("name", "").strip()
    phone     = body.get("phone", "").strip()
    specialty = body.get("specialty", "Не указана").strip() or "Не указана"
    client_email = body.get("email", "").strip()

    if not name or not phone:
        return {
            "statusCode": 422,
            "headers": cors,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    token   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    tg_ok = False
    if token and chat_id:
        text = (
            "Новая заявка — OSINT-РЭР\n\n"
            f"Имя: {name}\n"
            f"Телефон: {phone}\n"
            f"Специальность: {specialty}\n"
            + (f"Email: {client_email}\n" if client_email else "")
            + "\nИсточник: сайт OSINT-РЭР"
        )
        payload = urllib.parse.urlencode({"chat_id": chat_id, "text": text}).encode()
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        req = urllib.request.Request(url, data=payload, method="POST")
        req.add_header("Content-Type", "application/x-www-form-urlencoded")
        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                resp_data = json.loads(resp.read())
                tg_ok = resp_data.get("ok", False)
        except Exception:
            pass

    t = threading.Thread(target=do_async, args=(name, phone, specialty, client_email), daemon=True)
    t.start()
    t.join(timeout=25)

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "telegram": tg_ok}),
    }
