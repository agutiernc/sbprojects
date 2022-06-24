"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data


class UserModelTestCase(TestCase):
    """Tests model for User."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        user1 = User.signup(
            username='tester1', 
            email='user1@tester.com', 
            password='pswd1',
            image_url=None)
        
        user1.id = 2

        user2 = User.signup(
            username='tester2', 
            email='user2@tester.com', 
            password='pswd2',
            image_url=None)
        
        user2.id = 3
        
        db.session.commit()

        u1 = User.query.get(user1.id)
        u2 = User.query.get(user2.id)

        self.u1 = u1
        self.u2 = u2

        self.client = app.test_client()
    
    def tearDown(self):
        """Clean up fouled transactions."""

        db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)


    def test_user_signup(self):
        '''Testing signup model.'''

        user_test = self.u1

        self.assertIsNotNone(user_test)
        self.assertEqual(user_test.username, 'tester1')
        self.assertEqual(user_test.email, 'user1@tester.com')
        self.assertNotEqual(user_test.password, 'pswd1')

        # test bcrypt hash password starts with $2b$12$
        self.assertTrue(user_test.password, '$2b$12$')

    
    def test_user_auth(self):
        '''Tests if user/password authenticates.'''

        user = User.authenticate(self.u1.username, 'pswd1')

        self.assertIsNotNone(user)
        self.assertEqual(user.id, self.u1.id)

        self.assertFalse(User.authenticate('fakename', 'pswd1'))
        self.assertFalse(User.authenticate(self.u1.username, 'badpswd'))

    
    def test_user_follows(self):
        '''Tests the user's follows.'''

        # add user2 to user1's follows and commit to db
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertEqual(len(self.u1.following), 1)
        self.assertEqual(len(self.u2.following), 0)

        self.assertEqual(len(self.u1.followers), 0)
        self.assertEqual(len(self.u2.followers), 1)


    def test_is_following(self):
        '''Test .isfollowing().'''

        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u2.is_following(self.u1))


    def test_is_followed_by(self):
        '''Test .is_followed_by().'''

        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertFalse(self.u1.is_followed_by(self.u2))
        self.assertTrue(self.u2.is_followed_by(self.u1))