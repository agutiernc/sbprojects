'''Seed file to make sample data for users db'''

from models import User, db
from app import app

# create all tables
db.drop_all()
db.create_all()

# if table isn't empty, empty it
User.query.delete()

# data for users
user1 = User.register(
          username='harley', 
          password='<3batman', 
          email='harley@hahaha.com',
          first_name='Harley',
          last_name='Quinn'
        )

user2 = User.register(
          username='batman', 
          password='<3harley', 
          email='batman@batnet.com',
          first_name='Bruce',
          last_name='Wayne'
        )

# add new objects to session, so they'll persist
db.session.add_all([user1, user2])

# commit - which will save this
db.session.commit()
