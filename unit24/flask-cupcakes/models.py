"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    '''Connect app to DB'''

    db.app = app
    db.init_app(app)

DEFAULT_IMG_URL = 'https://tinyurl.com/demo-cupcake'

class Cupcake(db.Model):
    '''Cupcake Model for different types.'''

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMG_URL)

    def to_dict(self):
        '''Serialize cupcake info to a dictionary.'''

        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image,
        }