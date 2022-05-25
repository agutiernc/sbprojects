'''Seed file to make sample data for pets db'''

from models import Pet, db
from app import app

# create all tables
db.drop_all()
db.create_all()

# if table isn't empty, empty it
Pet.query.delete()

# pet images
pet1_img = 'https://images.pexels.com/photos/3726314/pexels-photo-3726314.jpeg'
pet2_img = 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg'

# data for pets
pet1 = Pet(name='Woofy', species='dog', photo_url=pet1_img, age=1, notes='Cute Akita.')
pet2 = Pet(name='Minx', species='cat', photo_url=pet2_img, age=2)
pet3 = Pet(name='Lizzy', species='lizard', notes='Likes to lick.', available=False)

# add new objects to session, so they'll persist
db.session.add(pet1)
db.session.add(pet2)
db.session.add(pet3)

# commit - which will save this
db.session.commit()