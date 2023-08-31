from flask_sqlalchemy import SQLAlchemy
import hashlib
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(64), nullable=False)
    characterID = db.Column(db.Integer, db.ForeignKey('Character.ID'))
    PaymentID = db.Column(db.Integer, db.ForeignKey('Payment.ID'))

    def set_password(self, password):
        self.password = hashlib.sha256(password.encode('utf-8')).hexdigest()


    def check_password(self, password_):
        return self.password == hashlib.sha256(password_.encode('utf-8')).hexdigest()


class Character(db.Model):
    __tablename__ = 'Character'
    ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50), nullable=False)
    ClassID = db.Column(db.Integer, db.ForeignKey('Character_Classes.ID'))
    ItemID = db.Column(db.Integer, db.ForeignKey('Item.ID'))
    PDF = db.Column(db.String(256))

class Character_Classes(db.Model):
    __tablename__ = 'Character_Classes'
    ID = db.Column(db.Integer, primary_key=True)
    Class = db.Column(db.String(30), nullable=False)
    Slot = db.Column(db.Integer)

class Payment(db.Model):
    __tablename__ = 'Payment'
    ID = db.Column(db.Integer, primary_key=True)
    Paid = db.Column(db.Boolean, default=False)
    Receipt = db.Column(db.String(256))

class Item(db.Model):
    __tablename__ = 'Item'
    ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(30), nullable=False)
    Description = db.Column(db.String(30), nullable=False)
    JPG = db.Column(db.String(256))
    Slot = db.Column(db.Integer)
