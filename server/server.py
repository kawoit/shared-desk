import flask, sys
import server_functions

flask_app = flask.Flask(__name__)

database = server_functions.Database()
database.add_dummy_data()

@flask_app.route('/set_free/<int:id>')
def set_free(id):
    database.set_free(id)
    return flask.redirect('/')

@flask_app.route('/set_in_use/<int:desk_id>')
def set_in_use(desk_id):
    card_id = flask.request.args.post('card_id')
    if card_id is None:
        database.set_in_use_test(desk_id)
    else:
        database.set_in_use(desk_id, card_id)
    return flask.redirect('/')

@flask_app.route('/')
def index():
    print (database.get_desks())
    return flask.render_template('index.html', desks=database.get_desks())

@flask_app.route('/desk/<int:id>')
def desk(id):
    return flask.render_template('desk.html', desk=database.get_desk(id))

@flask_app.route('/user/<int:id>')
def user(id):
    return flask.render_template('user.html', user=database.get_user(id))

@flask_app.route('/add_user/<string:name>/<string:card_id>')
def add_user(name, card_id):
    database.set_user(name, card_id)
    print(f"Added user {name}/{card_id}")
    return flask.redirect('/')

@flask_app.route('/add_desk/<string:name>')
def add_desk(name):
    database.set_desk(name)
    return flask.redirect('/')


flask_app.run(host='0.0.0.0',debug=True)
