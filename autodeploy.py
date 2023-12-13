from flask import Flask, request, abort
import subprocess
import hmac
import hashlib

app = Flask(__name__)

# Dein GitHub-Webhook-Secret
SECRET = "iottest"

@app.route('/webhook-endpoint', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Hub-Signature')

    if not signature:
        abort(400, 'X-Hub-Signature header missing')

    sha_name, signature = signature.split('=')

    if sha_name != 'sha1':
        abort(501, 'Unsupported X-Hub-Signature sha_name')

    mac = hmac.new(bytes(SECRET, 'utf-8'), msg=request.data, digestmod='sha1')

    if not hmac.compare_digest(str(mac.hexdigest()), str(signature)):
        abort(403, 'Invalid signature')

    data = request.get_json()

    if 'ref' in data:
        branch = data['ref'].split('/')[-1]

        # Hier kannst du die Logik für die Ausführung des Skripts hinzufügen, wenn es sich um die gewünschte Branch handelt.
        if branch == 'server-deploy':
            print('Webhook empfangen. Führe das Skript aus...')
            subprocess.run(['./build_and_restart.sh'])
        else:
            print(f'Webhook empfangen, aber für einen anderen Branch: {branch}')

    return 'OK'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
