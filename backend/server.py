import flask
import server_functions

flask_app = flask.Flask(__name__)

database = server_functions.Database()

@flask_app.route('/set_free/<int:id>')
def set_free(id):
    server_functions.set_free(id)
    return flask.redirect('/')

@flask_app.route('/set_in_use/<int:id>')
def set_in_use(id):
    database.set_in_use(id)
    return flask.redirect('/')

@flask_app.route('/')
def index():
    return flask.render_template('index.html', content="TEST!%$")

@flask_app.route('/desk/<int:id>')
def desk(id):
    return flask.render_template('desk.html', desk=database.get_desk(id))

@flask_app.route('/user/<int:id>')
def user(id):
    return flask.render_template('user.html', user=database.get_user(id))

@flask_app.route('/add_desk/<string:name>')
def add_desk(name):
    server_functions.add_desk(name)
    return flask.redirect('/')

flask_app.run(debug=True)
