"""
Отправка заявки с сайта OSINT-РЭР в Telegram + Email. v8
Принимает имя, телефон, специальность — отправляет боту и на почту.
"""
import json
import os
import urllib.request
import urllib.parse
import smtplib
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(name: str, phone: str, specialty: str):
    email_from = os.environ.get("EMAIL_FROM", "")
    email_password = os.environ.get("EMAIL_PASSWORD", "")
    print(f"[EMAIL] from={email_from!r} pwd_len={len(email_password)}")
    if not email_from or not email_password:
        print("[EMAIL] secrets missing — abort")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "🎯 Новая заявка — OSINT-РЭР"
    msg["From"] = email_from
    msg["To"] = email_from

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0a0f1e; color: #ffffff; padding: 30px; border-radius: 8px;">
        <h2 style="color: #00ff88; margin-bottom: 20px;">🎯 Новая заявка — OSINT-РЭР</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; color: #aaaaaa; width: 140px;">👤 Имя:</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #aaaaaa;">📞 Телефон:</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">{phone}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #aaaaaa;">🔰 Специальность:</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">{specialty}</td>
            </tr>
        </table>
        <p style="margin-top: 20px; color: #555555; font-size: 12px;">📍 Источник: сайт OSINT-РЭР</p>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.yandex.ru", 465, timeout=20) as server:
            server.login(email_from, email_password)
            server.sendmail(email_from, email_from, msg.as_string())
        print("[EMAIL] sent OK")
    except Exception as e:
        print(f"[EMAIL] ERROR: {type(e).__name__}: {e}")
        raise


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
    specialty = body.get("specialty", "Не указана").strip()
    print(f"[FORM] method={event.get('httpMethod')} name={name!r} phone={phone!r}")

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
            "🎯 *Новая заявка — OSINT-РЭР*\n\n"
            f"👤 *Имя:* {name}\n"
            f"📞 *Телефон:* {phone}\n"
            f"🔰 *Специальность:* {specialty}\n\n"
            "📍 Источник: сайт OSINT-РЭР"
        )

        payload = urllib.parse.urlencode({
            "chat_id":    chat_id,
            "text":       text,
            "parse_mode": "Markdown",
        }).encode()

        url = f"https://api.telegram.org/bot{token}/sendMessage"
        req = urllib.request.Request(url, data=payload, method="POST")
        req.add_header("Content-Type", "application/x-www-form-urlencoded")

        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                resp_data = json.loads(resp.read())
                tg_ok = resp_data.get("ok", False)
        except Exception:
            pass

    t = threading.Thread(target=send_email, args=(name, phone, specialty), daemon=True)
    t.start()
    t.join(timeout=25)
    email_ok = not t.is_alive()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "telegram": tg_ok, "email": email_ok}),
    }