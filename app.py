from flask import Flask
from views import views
from datetime import datetime
from db import create_db
#from models import User

app = Flask(__name__)

# secret key
app.config['SECRET_KEY'] = 'DESPUESVEOQUEENCAJOACA'

#add db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ghouls_archives.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


create_db(app)

app.register_blueprint(views, url_prefix="/views")

if __name__ == '__main__':
	app.run(debug=True, port=8000)
