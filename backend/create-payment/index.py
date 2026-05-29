import json
import os
import uuid
import urllib.request
import base64

def handler(event: dict, context) -> dict:
    """Создаёт платёж в ЮKassa для оплаты вступительного взноса (1500 руб)"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '')
    phone = body.get('phone', '')
    email = body.get('email', '')
    return_url = body.get('return_url', 'https://podpole.ru')

    shop_id = os.environ['YUKASSA_SHOP_ID']
    secret_key = os.environ['YUKASSA_SECRET_KEY']

    idempotence_key = str(uuid.uuid4())

    payment_data = {
        "amount": {
            "value": "1500.00",
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": return_url
        },
        "capture": True,
        "description": f"Вступительный взнос НПК «Подъполье». Пайщик: {name}, тел: {phone}",
        "metadata": {
            "name": name,
            "phone": phone,
            "email": email
        }
    }

    credentials = base64.b64encode(f"{shop_id}:{secret_key}".encode()).decode()
    req = urllib.request.Request(
        "https://api.yookassa.ru/v3/payments",
        data=json.dumps(payment_data).encode('utf-8'),
        headers={
            "Authorization": f"Basic {credentials}",
            "Content-Type": "application/json",
            "Idempotence-Key": idempotence_key
        },
        method="POST"
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode('utf-8'))

    confirmation_url = result['confirmation']['confirmation_url']
    payment_id = result['id']

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'confirmation_url': confirmation_url,
            'payment_id': payment_id
        })
    }
