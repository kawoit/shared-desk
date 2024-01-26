import json
from time import sleep
from datetime import datetime
import requests
import sqlite3
import flask


class Database:
    def __init__(self):
        self.run_sql_statement(
            r"CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, card_id TEXT)"
        )
        self.run_sql_statement(
            r"CREATE TABLE IF NOT EXISTS desk (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, room TEXT,x_pos INT, y_pos INT, in_use BOOL, card_id TEXT)"
        )

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
        self.run_sql_statement(
            f'UPDATE desk SET card_id="{user_id}" WHERE id={desk_id}'
        )

    def is_in_use(self, desk_id):
        result = self.run_sql_statement(f"SELECT in_use FROM desk WHERE id={desk_id}")
        if result:
            return True
        else:
            return False

    def set_free(self, desk_id):
        self.run_sql_statement(
            f"UPDATE desk SET in_use=0, card_id=NULL WHERE id={desk_id}"
        )

    def get_free_desks(self):
        result = self.run_sql_statement("SELECT * FROM desk WHERE in_use=0")
        return result

    def get_desks(self):
        result = self.run_sql_statement("SELECT * FROM desk")
        return result

    def get_users(self):
        result = self.run_sql_statement(f"SELECT * FROM user")
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
        self.run_sql_statement(
            f"INSERT INTO user(name, card_id) VALUES ('{name}', '{card_id}')"
        )

    def set_desk(self, name, room="test9913", x_pos=0, y_pos=0):
        self.run_sql_statement(
            f"INSERT INTO desk(name, in_use, room, x_pos, y_pos) VALUES ('{name}', 0, '{room}', {x_pos}, {y_pos})"
        )

    def add_room(self, data):
        # data: {"Name":"Hello","desks":[{"name":"desk0","x_pos":"1","y_pos":"1"},{"name":"desk3","x_pos":"4","y_pos":"1"},{"name":"desk4","x_pos":"1","y_pos":"2"},{"name":"desk6","x_pos":"3","y_pos":"2"}]}
        room_name = data["Name"]
        desks = data["desks"]
        for desk in desks:
            desk_name = desk["name"]
            x_pos = desk["x_pos"]
            y_pos = desk["y_pos"]
            self.set_desk(desk_name, room_name, x_pos, y_pos)
        return True

    def get_rooms(self):
        result = self.run_sql_statement("SELECT DISTINCT room FROM desk")
        # remove duplicates
        result = list(dict.fromkeys(result))
        return result

    def get_user_id(self, name):
        result = self.run_sql_statement(r"SELECT id FROM user WHERE name=?", (name,))
        return result

    def get_desk_id(self, name):
        result = self.run_sql_statement(r"SELECT id FROM desk WHERE name=?", (name,))
        return result

    def add_dummy_data(self):
        # self.run_sql_statement("DELETE FROM user")
        # self.run_sql_statement("DELETE FROM desk")
        # self.set_desk("Desk 1", "Room 1", 1, 5)
        # self.set_desk("TestDesk", "Room 1", 0, 1)
        # self.set_desk("Desk 3", "Room 1", 2, 3)
        # self.set_desk("Desk 4", "Room 1", 3, 2)
        # self.set_desk("Desk 5", "Room 1", 4, 1)
        # self.set_desk("Desk 6", "Room 1", 5, 0)

        # self.set_user("Martin", "612611355")
        # self.set_user("Peter", "1371817183")
        # self.set_user("TestHandy", "199b7e00c287e47ab07f7edc345f9b5b")
        pass


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
        url = "https://api.particle.io/v1/devices/3e0022000c47353136383631/Present?access_token=76ce7a46ea0e0ca0031d3bd60859082e52b38806"
        self.url = url

    def loop(self):
        while True:
            # Führe die GET-Anfrage aus
            response = requests.get(self.url)

            # Überprüfe, ob die Anfrage erfolgreich war (Status-Code 200)
            if response.status_code == 200:
                print(f"{datetime.now()} - Communication Success")
                data = response.text
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
        url = "https://api.particle.io/v1/devices/3e0022000c47353136383631/led"
        data = {
            "access_token": "76ce7a46ea0e0ca0031d3bd60859082e52b38806",
            "args": "on",
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
