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

# data for posts
post1 = Post(title='A Great Day', content='I had a very nice day', user=users[0])
post2 = Post(title='Who did it?', content='It stinks in here!', user=users[1])

# add and commit posts with their users
db.session.add(post1)
db.session.add(post2)

db.session.commit()