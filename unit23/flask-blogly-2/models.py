from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

DEFAULT_IMG_URL = 'https://cdn-icons-png.flaticon.com/512/2919/2919600.png'

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                primary_key=True,
                autoincrement=True)
    
    first_name = db.Column(db.String(50), nullable=False)
    
    last_name = db.Column(db.String(50), nullable=False)

    image_url = db.Column(db.Text, nullable=False,
                            default=DEFAULT_IMG_URL)
    
    def __repr__(self):
        u = self

        return f'{u.first_name} {u.last_name}'
