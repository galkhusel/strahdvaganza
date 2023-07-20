from flask import Flask
from views import views
from DB import db
from endpoints.User import users_bp
app = Flask(__name__)

# secret key
app.config['SECRET_KEY'] = 'DESPUESVEOQUEENCAJOACA'

# add db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ghouls_archives.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

app.register_blueprint(views, url_prefix="/views")
app.register_blueprint(users_bp, url_prefix="/ghouls_archives/entourage")  # Update the url_prefix

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8000)