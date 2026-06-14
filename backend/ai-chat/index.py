import json
import os
import urllib.request
import urllib.error

SYSTEM_PROMPT = (
    "Ты — вежливый ИИ-консультант на сайте по набору на военную службу по контракту в "
    "Вооружённые силы РФ. Отвечай кратко, по делу и дружелюбно на русском языке. "
    "Помогай посетителям с вопросами о службе, льготах и гарантиях, этапах поступления, "
    "выплатах и условиях. Если спрашивают, как подать заявку — предложи оставить имя и "
    "телефон в форме на сайте или заказать звонок. Не выдумывай точные суммы и сроки, "
    "если не уверен — предложи уточнить у консультанта. Не обсуждай темы, не связанные со "
    "службой и сайтом."
)


def handler(event: dict, context) -> dict:
    """ИИ чат-консультант на базе OpenAI GPT. Принимает историю сообщений и возвращает ответ ассистента."""
    method = event.get('httpMethod', 'GET')
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'AI is not configured'}),
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        body = {}

    history = body.get('messages') or []
    clean_history = []
    for m in history[-10:]:
        role = m.get('role')
        content = (m.get('content') or '').strip()
        if role in ('user', 'assistant') and content:
            clean_history.append({'role': role, 'content': content[:2000]})

    if not clean_history:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'No messages provided'}),
        }

    messages = [{'role': 'system', 'content': SYSTEM_PROMPT}] + clean_history

    payload = json.dumps({
        'model': 'gpt-4o-mini',
        'messages': messages,
        'temperature': 0.6,
        'max_tokens': 500,
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        reply = data['choices'][0]['message']['content'].strip()
    except urllib.error.HTTPError as e:
        return {
            'statusCode': 502,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'AI service error', 'detail': e.read().decode('utf-8', 'ignore')[:300]}),
        }
    except Exception as e:
        return {
            'statusCode': 502,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'AI request failed', 'detail': str(e)[:300]}),
        }

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'reply': reply}, ensure_ascii=False),
    }
