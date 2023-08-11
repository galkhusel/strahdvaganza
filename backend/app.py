from flask import Flask
from views import views
from db import db
from endpoints.User import users_bp, login_manager
from endpoints.Character import characters_bp 

# Create the Flask app instance
app = Flask(__name__)

# add db
app.secret_key = "SANCTIFIED_BLOOD"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ghouls_archives.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'D:\\Backup\\rol\\COS SMDT\\strahd 2023\\strahdvaganza\\backend\\instance\\PDF'
app.config["ALLOWED_EXTENSIONS"] = {'pdf'}
# Initialize the database
db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = 'login'

app.register_blueprint(views, url_prefix="/views")
app.register_blueprint(users_bp, url_prefix="/ghouls_archives/entourage")  # Update the url_prefix
app.register_blueprint(characters_bp, url_prefix="/ghouls_archives/spectral_manifestation")

# Only create the database tables when running the app directly
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8000)