import json
from time import sleep
from datetime import datetime
import requests
import sqlite3
import flask

class Database:
    def __init__(self):
        self.run_sql_statement(r"CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, card_id TEXT)")
        self.run_sql_statement(r"CREATE TABLE IF NOT EXISTS desk (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, room TEXT,x_pos INT, y_pos INT, in_use BOOL, card_id TEXT)")

    def run_sql_statement(self, query):
        connection = sqlite3.connect("data.sqlite")
        cursor = connection.cursor()
        # if values:
        #     cursor.execute(query, values)
        # else:
        cursor.execute(query)
        connection.commit()
        data = cursor.fetchall()
        connection.close()
        return data
    
    def set_in_use_test(self, desk_id):
        self.run_sql_statement(f"UPDATE desk SET in_use=1 WHERE id={desk_id}")

    def set_in_use(self, desk_id, user_id):
        self.run_sql_statement(f"UPDATE desk SET in_use=1 WHERE id={desk_id}")
        self.run_sql_statement(f'UPDATE desk SET card_id="{user_id}" WHERE id={desk_id}')

    def is_in_use(self, desk_id):
        result = self.run_sql_statement(f"SELECT in_use FROM desk WHERE id={desk_id}")
        if result:
            return True
        else:
            return False

    def set_free(self, desk_id):
        self.run_sql_statement(f"UPDATE desk SET in_use=0, card_id=NULL WHERE id={desk_id}")

    def get_free_desks(self):
        result = self.run_sql_statement("SELECT * FROM desk WHERE in_use=0")
        return result
    
    def get_desks(self):
        result = self.run_sql_statement("SELECT * FROM desk")
        return result

    def get_user(self, user_id):
        result = self.run_sql_statement(f"SELECT * FROM user WHERE id={user_id}")
        return result
    
    def get_user_by_card_id(self, card_id):
        result = self.run_sql_statement(f"SELECT * FROM user WHERE card_id='{card_id}'")
        return result

    def get_desk(self, desk_id):
        result = self.run_sql_statement(f"SELECT * FROM desk WHERE id=?", (desk_id,))
        return result

    def set_user(self, name, card_id):
        self.run_sql_statement(f"INSERT INTO user(name, card_id) VALUES ('{name}', '{card_id}')")

    def set_desk(self, name):
        self.run_sql_statement(f"INSERT INTO desk(name, in_use) VALUES ('{name}', 0)")

    def get_user_id(self, name):
        result = self.run_sql_statement(r"SELECT id FROM user WHERE name=?", (name,))
        return result

    def get_desk_id(self, name):
        result = self.run_sql_statement(r"SELECT id FROM desk WHERE name=?", (name,))
        return result
    
    def add_dummy_data(self):
        self.run_sql_statement("DELETE FROM user")
        self.run_sql_statement("DELETE FROM desk")
        self.set_desk("Desk 1")
        self.set_desk("TestDesk")
        self.set_desk("Desk 3")

        self.set_user("Martin", "612611355")
        self.set_user("Peter", "b1b7ac8d459c051f0cfb9146396f5463")
        self.set_user("TestHandy", "199b7e00c287e47ab07f7edc345f9b5b")

class Desk:
    def __init__(self, name, database):
        self.name = name
        database.set_desk(name)
        self.id = Database.get_desk_id(self.name)

    def set_in_use(self, user_id):
        self.in_use = True
        Database.set_in_use(self.id, user_id)

    def set_free(self):
        self.in_use = False
        Database.set_free(self.id)

    def is_in_use(self):
        return Database.is_in_use(self.id)
    
class User:
    def __init__(self, name):
        self.name = name
        Database.set_user(self.name)
        self.id = Database.get_user_id(self.name)

class Particle_Communication:
    def __init__(self, url):
        print("Initialize Communication ...")
        url = 'https://api.particle.io/v1/devices/3e0022000c47353136383631/Present?access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806'
        self.url = url

    def loop(self):
        while True:
            # Führe die GET-Anfrage aus
            response = requests.get(self.url)

            # Überprüfe, ob die Anfrage erfolgreich war (Status-Code 200)
            if response.status_code == 200:
                print(f"{datetime.now()} - Communication Success")
                data = (response.text)
                # print(f"\n\nresponse-data:{data}\n\n")
                data_json = json.loads(data)
                # Ergebnis "result" aus den Daten extrahieren
                result = data_json["result"]
                id = data_json["id_person"]
                response(result)

                sleep(1)
            else:
                print(f"{datetime.now()} - Communication Error")
                result = False
                sleep(5)

    def response(self, result):
        url = 'https://api.particle.io/v1/devices/3e0022000c47353136383631/led'
        data = {
                'access_token': '76ce7a46ea0e0ca0031d3bd60859082e52b38806',
                'args': 'on'
            }
        response = requests.post(url, data=data)
        if response.status_code == 200:
            print("Anfrage erfolgreich gesendet.")
            exit()
        else:
            print(f"Fehler bei der Anfrage. Status-Code: {response.status_code}")

class Server:
    def __init__(self):
        print("Initialize Server ...")
        self.database = Database()
        self.flask_app = flask.Flask(__name__)
        self.flask_app.run(host="0.0.0.0")

class Program:
    def __init__(self, testing=False):
        print("Initialize Program ...")
        self.database = Database()
        if testing:
            self.desks = [("Desk 1"), ("Desk 2"), ("Desk 3")]

        for desk in self.desks:
            self.database.set_desk(desk)

        self.database.set_user("wolle", "61.26.113.55")

    def loop(self):
        print("Start Loop ...")
        while True:
            print("Loop ...")
            # self.communication.loop()
            sleep(1)
    
if __name__ == "__main__":
    Server()
    program = Program(testing=True)
    program.loop()
