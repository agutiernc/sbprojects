'''Seed file to make sample data for users db'''

from models import User, Post, db
from app import app

# create all tables
db.drop_all()
db.create_all()

# if table isn't empty, empty it
User.query.delete()
Post.query.delete()

# user first and last names
f_names = ["Laura", "Sherry", "Daniel", "Maureen", "Colt"]
l_names = ["Morales", "Owen", "Potts", "Diaz", "Steele"]

# add users
users = [User(first_name=f, last_name=l) for f, l in zip(f_names, l_names)]

# add new objects to session, so they'll persist
db.session.add_all(users)

# commit - which will save this
db.session.commit()