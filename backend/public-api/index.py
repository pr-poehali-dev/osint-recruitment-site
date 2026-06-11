"""
Публичный API OSINT-РЭР: трекинг кликов, обратные звонки, чтение блога/документов, статус заявки.
Не требует авторизации.
"""
import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def esc(v):
    return str(v).replace("'", "''")


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }
    method = event.get("httpMethod", "GET")
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    params = event.get("queryStringParameters") or {}
    resource = params.get("resource", "")

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        if resource == "blog":
            cur.execute("SELECT id, title, excerpt, body, image_url, created_at FROM blog_posts WHERE active = true ORDER BY sort_order, id DESC")
            data = [{"id": r[0], "title": r[1], "excerpt": r[2], "body": r[3], "image_url": r[4], "created_at": r[5].isoformat() if r[5] else None} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"blog": data})}
        if resource == "documents":
            cur.execute("SELECT id, title, description, image_url FROM documents WHERE active = true ORDER BY sort_order, id")
            data = [{"id": r[0], "title": r[1], "description": r[2], "image_url": r[3]} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"documents": data})}
        if resource == "status":
            raw = params.get("phone", "")[:50]
            digits = "".join(c for c in raw if c.isdigit())
            # берём последние 10 цифр (без кода страны 7/8) для надёжного сравнения
            tail = digits[-10:] if len(digits) >= 10 else digits
            tail = esc(tail)
            cur.execute(
                "SELECT status, created_at FROM applications "
                "WHERE right(regexp_replace(phone, '\\D', '', 'g'), 10) = '" + tail + "' "
                "ORDER BY created_at DESC LIMIT 1"
            )
            row = cur.fetchone()
            cur.close(); conn.close()
            if not row:
                return {"statusCode": 200, "headers": cors, "body": json.dumps({"found": False})}
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"found": True, "status": row[0], "created_at": row[1].isoformat() if row[1] else None})}
        cur.close(); conn.close()
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Unknown resource"})}

    if method == "POST":
        try:
            body = json.loads(event.get("body") or "{}")
        except Exception:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Bad JSON"})}
        action = body.get("action", "")
        conn = get_conn()
        cur = conn.cursor()

        if action == "click":
            source = esc((body.get("source") or "unknown")[:80])
            cur.execute(f"INSERT INTO button_clicks (source) VALUES ('{source}')")
            conn.commit(); cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        if action == "callback":
            name = esc((body.get("name") or "")[:150])
            phone = esc((body.get("phone") or "")[:50])
            ptime = esc((body.get("preferred_time") or "")[:100])
            if not phone:
                cur.close(); conn.close()
                return {"statusCode": 422, "headers": cors, "body": json.dumps({"error": "Телефон обязателен"})}
            cur.execute(f"INSERT INTO callbacks (name, phone, preferred_time) VALUES ('{name}', '{phone}', '{ptime}')")
            conn.commit(); cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        cur.close(); conn.close()
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Unknown action"})}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}