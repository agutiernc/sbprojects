'''Models for adopting a pet'''
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    '''Connect app to DB'''

    db.app = app
    db.init_app(app)

DEFAULT_IMG_URL = 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634__340.png'

class Pet(db.Model):
    '''Pet available for adoption.'''

    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String(50), nullable=False)
    photo_url = db.Column(db.Text, default=DEFAULT_IMG_URL)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)
