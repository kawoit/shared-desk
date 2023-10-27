import json
import subprocess
from time import sleep
import os
import requests

while True:
    sleep(1)
    # data = os.system('curl https://api.particle.io/v1/devices/3e0022000c47353136383631/Present?access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806')
    #result = subprocess.run(['curl', 'https://api.particle.io/v1/devices/3e0022000c47353136383631/Present?access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806'], stdout=subprocess.PIPE)
    # delete the last char of the output
    #data = result.stdout

    

    # Die URL, die du abfragen möchtest
    url = 'https://api.particle.io/v1/devices/3e0022000c47353136383631/Present?access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806'

    # Führe die GET-Anfrage aus
    response = requests.get(url)

    # Überprüfe, ob die Anfrage erfolgreich war (Status-Code 200)
    if response.status_code == 200:
        # Inhalt der Antwort anzeigen
        data = (response.text)

    # print(type(data))

    data_json = json.loads(data)

    # Ergebnis "result" aus den Daten extrahieren
    result = data_json["result"]

    if (result):
        url = 'https://api.particle.io/v1/devices/3e0022000c47353136383631/led'

        # Die Daten, die du senden möchtest
        data = {
            'access_token': '76ce7a46ea0e0ca0031d3bd60859082e52b38806',
            'args': 'on'
        }

        # Führe die POST-Anfrage aus
        response = requests.post(url, data=data)

        # Überprüfe, ob die Anfrage erfolgreich war (Status-Code 200)
        if response.status_code == 200:
            print("Anfrage erfolgreich gesendet.")
            exit()
        else:
            print(f"Fehler bei der Anfrage. Status-Code: {response.status_code}")
    
