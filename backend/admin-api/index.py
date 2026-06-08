"""
Admin API для OSINT-РЭР: заявки, вакансии, FAQ, галерея, статистика.
Публичный GET (resource=vacancies/faq/gallery) — активные элементы.
Админский доступ по заголовку X-Admin-Password для всего остального.
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
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    }
    method = event.get("httpMethod", "GET")
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    headers = event.get("headers") or {}
    admin_pwd = os.environ.get("ADMIN_PASSWORD", "")
    sent = headers.get("X-Admin-Password") or headers.get("x-admin-password") or ""
    is_admin = bool(admin_pwd) and sent == admin_pwd

    params = event.get("queryStringParameters") or {}
    resource = params.get("resource", "")

    # ── Публичное чтение активных вакансий / FAQ / галереи ──
    if method == "GET" and resource in ("vacancies", "faq", "gallery") and not is_admin:
        conn = get_conn()
        cur = conn.cursor()
        if resource == "vacancies":
            cur.execute("SELECT id, specialty, level, icon, title, descr, tags, salary FROM vacancies WHERE active = true ORDER BY sort_order, id")
            data = [{"id": r[0], "specialty": r[1], "level": r[2], "icon": r[3], "title": r[4], "descr": r[5], "tags": r[6].split(",") if r[6] else [], "salary": r[7]} for r in cur.fetchall()]
        elif resource == "faq":
            cur.execute("SELECT id, question, answer FROM faq WHERE active = true ORDER BY sort_order, id")
            data = [{"id": r[0], "question": r[1], "answer": r[2]} for r in cur.fetchall()]
        else:
            cur.execute("SELECT id, url, caption FROM gallery WHERE active = true ORDER BY sort_order, id")
            data = [{"id": r[0], "url": r[1], "caption": r[2]} for r in cur.fetchall()]
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({resource: data})}

    # ── Дальше только админ ──
    if not is_admin:
        return {"statusCode": 403, "headers": cors, "body": json.dumps({"error": "Доступ запрещён"})}

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        if resource == "applications":
            cur.execute("SELECT id, name, phone, specialty, status, note, created_at FROM applications ORDER BY created_at DESC")
            data = [{"id": r[0], "name": r[1], "phone": r[2], "specialty": r[3], "status": r[4], "note": r[5], "created_at": r[6].isoformat() if r[6] else None} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"applications": data})}
        if resource == "stats":
            cur.execute("SELECT status, COUNT(*) FROM applications GROUP BY status")
            by_status = {r[0]: r[1] for r in cur.fetchall()}
            cur.execute("SELECT to_char(created_at::date, 'YYYY-MM-DD') d, COUNT(*) FROM applications WHERE created_at > now() - interval '14 days' GROUP BY d ORDER BY d")
            by_day = [{"date": r[0], "count": r[1]} for r in cur.fetchall()]
            cur.execute("SELECT COUNT(*) FROM applications")
            total = cur.fetchone()[0]
            cur.execute("SELECT source, COUNT(*) FROM button_clicks GROUP BY source ORDER BY COUNT(*) DESC")
            clicks_by_source = [{"source": r[0], "count": r[1]} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"total": total, "by_status": by_status, "by_day": by_day, "clicks_by_source": clicks_by_source})}
        if resource == "callbacks":
            cur.execute("SELECT id, name, phone, preferred_time, status, created_at FROM callbacks ORDER BY created_at DESC")
            data = [{"id": r[0], "name": r[1], "phone": r[2], "preferred_time": r[3], "status": r[4], "created_at": r[5].isoformat() if r[5] else None} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"callbacks": data})}
        if resource == "blog":
            cur.execute("SELECT id, title, excerpt, body, image_url, sort_order, active FROM blog_posts ORDER BY sort_order, id DESC")
            data = [{"id": r[0], "title": r[1], "excerpt": r[2], "body": r[3], "image_url": r[4], "sort_order": r[5], "active": r[6]} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"blog": data})}
        if resource == "documents":
            cur.execute("SELECT id, title, description, image_url, sort_order, active FROM documents ORDER BY sort_order, id")
            data = [{"id": r[0], "title": r[1], "description": r[2], "image_url": r[3], "sort_order": r[4], "active": r[5]} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"documents": data})}
        if resource in ("vacancies", "faq", "gallery"):
            if resource == "vacancies":
                cur.execute("SELECT id, specialty, level, icon, title, descr, tags, salary, sort_order, active FROM vacancies ORDER BY sort_order, id")
                data = [{"id": r[0], "specialty": r[1], "level": r[2], "icon": r[3], "title": r[4], "descr": r[5], "tags": r[6], "salary": r[7], "sort_order": r[8], "active": r[9]} for r in cur.fetchall()]
            elif resource == "faq":
                cur.execute("SELECT id, question, answer, sort_order, active FROM faq ORDER BY sort_order, id")
                data = [{"id": r[0], "question": r[1], "answer": r[2], "sort_order": r[3], "active": r[4]} for r in cur.fetchall()]
            else:
                cur.execute("SELECT id, url, caption, sort_order, active FROM gallery ORDER BY sort_order, id")
                data = [{"id": r[0], "url": r[1], "caption": r[2], "sort_order": r[3], "active": r[4]} for r in cur.fetchall()]
            cur.close(); conn.close()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({resource: data})}
        cur.close(); conn.close()
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Unknown resource"})}

    if method == "POST":
        try:
            body = json.loads(event.get("body") or "{}")
        except Exception:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Bad JSON"})}
        action = body.get("action", "")
        rid = int(body.get("id") or 0)
        conn = get_conn()
        cur = conn.cursor()

        # Заявки
        if action == "app_status":
            cur.execute(f"UPDATE applications SET status = '{esc(body.get('status','new'))}' WHERE id = {rid}")
        elif action == "app_note":
            cur.execute(f"UPDATE applications SET note = '{esc(body.get('note',''))}' WHERE id = {rid}")
        elif action == "app_delete":
            cur.execute(f"DELETE FROM applications WHERE id = {rid}")

        # Вакансии
        elif action == "vacancy_save":
            v = body
            tags = esc(",".join(v.get("tags", [])) if isinstance(v.get("tags"), list) else v.get("tags", ""))
            fields = f"specialty='{esc(v.get('specialty','osint'))}', level='{esc(v.get('level','без опыта'))}', icon='{esc(v.get('icon','Briefcase'))}', title='{esc(v.get('title',''))}', descr='{esc(v.get('descr',''))}', tags='{tags}', salary='{esc(v.get('salary',''))}', sort_order={int(v.get('sort_order') or 0)}, active={'true' if v.get('active', True) else 'false'}"
            if rid > 0:
                cur.execute(f"UPDATE vacancies SET {fields} WHERE id = {rid}")
            else:
                cur.execute(f"INSERT INTO vacancies (specialty, level, icon, title, descr, tags, salary, sort_order, active) VALUES ('{esc(v.get('specialty','osint'))}','{esc(v.get('level','без опыта'))}','{esc(v.get('icon','Briefcase'))}','{esc(v.get('title',''))}','{esc(v.get('descr',''))}','{tags}','{esc(v.get('salary',''))}',{int(v.get('sort_order') or 0)},{'true' if v.get('active', True) else 'false'})")
        elif action == "vacancy_delete":
            cur.execute(f"DELETE FROM vacancies WHERE id = {rid}")

        # FAQ
        elif action == "faq_save":
            f = body
            fields = f"question='{esc(f.get('question',''))}', answer='{esc(f.get('answer',''))}', sort_order={int(f.get('sort_order') or 0)}, active={'true' if f.get('active', True) else 'false'}"
            if rid > 0:
                cur.execute(f"UPDATE faq SET {fields} WHERE id = {rid}")
            else:
                cur.execute(f"INSERT INTO faq (question, answer, sort_order, active) VALUES ('{esc(f.get('question',''))}','{esc(f.get('answer',''))}',{int(f.get('sort_order') or 0)},{'true' if f.get('active', True) else 'false'})")
        elif action == "faq_delete":
            cur.execute(f"DELETE FROM faq WHERE id = {rid}")

        # Галерея
        elif action == "gallery_save":
            g = body
            fields = f"url='{esc(g.get('url',''))}', caption='{esc(g.get('caption',''))}', sort_order={int(g.get('sort_order') or 0)}, active={'true' if g.get('active', True) else 'false'}"
            if rid > 0:
                cur.execute(f"UPDATE gallery SET {fields} WHERE id = {rid}")
            else:
                cur.execute(f"INSERT INTO gallery (url, caption, sort_order, active) VALUES ('{esc(g.get('url',''))}','{esc(g.get('caption',''))}',{int(g.get('sort_order') or 0)},{'true' if g.get('active', True) else 'false'})")
        elif action == "gallery_delete":
            cur.execute(f"DELETE FROM gallery WHERE id = {rid}")

        # Блог
        elif action == "blog_save":
            b = body
            fields = f"title='{esc(b.get('title',''))}', excerpt='{esc(b.get('excerpt',''))}', body='{esc(b.get('body',''))}', image_url='{esc(b.get('image_url',''))}', sort_order={int(b.get('sort_order') or 0)}, active={'true' if b.get('active', True) else 'false'}"
            if rid > 0:
                cur.execute(f"UPDATE blog_posts SET {fields} WHERE id = {rid}")
            else:
                cur.execute(f"INSERT INTO blog_posts (title, excerpt, body, image_url, sort_order, active) VALUES ('{esc(b.get('title',''))}','{esc(b.get('excerpt',''))}','{esc(b.get('body',''))}','{esc(b.get('image_url',''))}',{int(b.get('sort_order') or 0)},{'true' if b.get('active', True) else 'false'})")
        elif action == "blog_delete":
            cur.execute(f"DELETE FROM blog_posts WHERE id = {rid}")

        # Документы
        elif action == "document_save":
            d = body
            fields = f"title='{esc(d.get('title',''))}', description='{esc(d.get('description',''))}', image_url='{esc(d.get('image_url',''))}', sort_order={int(d.get('sort_order') or 0)}, active={'true' if d.get('active', True) else 'false'}"
            if rid > 0:
                cur.execute(f"UPDATE documents SET {fields} WHERE id = {rid}")
            else:
                cur.execute(f"INSERT INTO documents (title, description, image_url, sort_order, active) VALUES ('{esc(d.get('title',''))}','{esc(d.get('description',''))}','{esc(d.get('image_url',''))}',{int(d.get('sort_order') or 0)},{'true' if d.get('active', True) else 'false'})")
        elif action == "document_delete":
            cur.execute(f"DELETE FROM documents WHERE id = {rid}")

        # Обратные звонки
        elif action == "callback_status":
            cur.execute(f"UPDATE callbacks SET status = '{esc(body.get('status','new'))}' WHERE id = {rid}")
        elif action == "callback_delete":
            cur.execute(f"DELETE FROM callbacks WHERE id = {rid}")

        else:
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Unknown action"})}

        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}