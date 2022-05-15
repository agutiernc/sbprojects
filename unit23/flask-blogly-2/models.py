from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

def connect_db(app):
    '''Connect app to DB'''
    db.app = app
    db.init_app(app)

DEFAULT_IMG_URL = 'https://cdn-icons-png.flaticon.com/512/2919/2919600.png'

class User(db.Model):
    '''Site users'''

    __tablename__ = 'users'

    id = db.Column(db.Integer,
                primary_key=True,
                autoincrement=True)
    
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.Text, nullable=False,
                            default=DEFAULT_IMG_URL)

    posts = db.relationship('Post', backref='user', cascade='all, delete-orphan')
    
    def __repr__(self):
        u = self

        return f'{u.first_name} {u.last_name}'

class Post(db.Model):
    '''Blog posts'''

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)