"""
Отправка заявки с сайта OSINT-РЭР в Telegram. v4
Принимает имя, телефон, специальность — отправляет боту.
"""
import json
import os
import urllib.request
import urllib.parse


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

    if not name or not phone:
        return {
            "statusCode": 422,
            "headers": cors,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    token   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    if not token or not chat_id:
        # секреты не настроены — просто подтверждаем получение
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"ok": True, "note": "secrets_missing"}),
        }

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
            if resp_data.get("ok"):
                return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}
            return {"statusCode": 500, "headers": cors, "body": json.dumps({"error": "tg_error", "detail": resp_data})}
    except Exception as e:
        return {"statusCode": 500, "headers": cors, "body": json.dumps({"error": str(e)})}