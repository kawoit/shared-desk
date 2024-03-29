from flask import Flask, redirect, url_for, render_template, request, jsonify
import server_functions

flask_app = Flask(__name__)

database = server_functions.Database()
database.add_dummy_data()


def get_username_by_card_id(card_id):
    data = database.get_user_by_card_id(card_id)
    return data[0][1]


def process_desks():
    desks = database.get_desks()
    # desks data: [[4, "Desk 1", 0, null], [5, "Desk 2", 1, "ffc243d4adda2885bb05d603e8d120b2"], [6, "Desk 3", 0, null]]
    new_desks = []
    for desk in desks:
        new_desk = {}
        new_desk["id"] = desk[0]
        new_desk["name"] = desk[1]
        new_desk["room"] = desk[2]
        new_desk["x_pos"] = desk[3]
        new_desk["y_pos"] = desk[4]
        new_desk["is_used"] = desk[5]
        new_desk["card_id"] = desk[6]
        if new_desk["card_id"]:
            new_desk["user"] = get_username_by_card_id(new_desk["card_id"])
        else:
            new_desk["user"] = None
        new_desks.append(new_desk)
    return new_desks


@flask_app.route("/")
def index():
    desks = process_desks()
    return render_template("index.html", desks=desks)


@flask_app.route("/set_free")
def set_free():
    desk_id = request.args.get("desk_id")
    desk_id = int(desk_id)
    database.set_free(desk_id)
    return redirect("/")


@flask_app.route("/set_in_use", methods=["GET"])
def set_in_use():
    desk_id = request.args.get("desk_id")
    card_id = request.args.get("card_id")
    desk_id.strip()
    card_id.strip()
    desk_id = int(desk_id)
    if desk_id is None or card_id is None:
        return "Error"
    else:
        database.set_in_use(desk_id, card_id)
    return redirect("/")


@flask_app.route("/get_desks_data")
def get_desks_data():
    desks = process_desks()
    return {"desks": desks}


@flask_app.route("/get_rooms")
def get_rooms():
    rooms = database.get_rooms()
    return jsonify(rooms)


@flask_app.route("/add_user", methods=["POST"])
def add_user():
    name = request.form.get("name")
    card_id = request.form.get("card_id")
    database.set_user(name, card_id)
    print(f"Added user {name}/{card_id}")
    return redirect("/")


@flask_app.route("/add_desk/<string:name>")
def add_desk(name):
    database.set_desk(name)
    return redirect("/")


@flask_app.route("/admin", methods=["GET", "POST"])
def admin():
    if request.method == "POST":
        print(f"add room: {request.get_json()}")
        database.add_room(request.get_json())
        return "OK", 200
    else:
        desks = process_desks()
        return render_template("admin.html", desks=desks)


@flask_app.route("/db")
def print_db():
    db_content = {"desks": database.get_desks(), "users": database.get_users()}
    return jsonify(db_content), 200


if __name__ == "__main__":
    flask_app.run(host="0.0.0.0", debug=True)
