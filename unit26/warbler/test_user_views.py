"""User View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_user_views.py

import os
from unittest import TestCase

from models import db, connect_db, Message, User, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class UserViewTestCase(TestCase):
    '''Test views for users.'''

    def setUp(self):
        '''Create test client, add sample data.'''

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        self.testuser.id = 101

        # additional users
        self.user1 = User.signup(username="user1",
                                    email="user1@test.com",
                                    password="pswd1",
                                    image_url=None)
        
        self.user1.id = 202

        self.user2 = User.signup(username="user2",
                                    email="user2@test.com",
                                    password="pswd2",
                                    image_url=None)
        
        self.user2.id = 303

        db.session.commit()

    def tearDown(self):
        '''Clean up fouled transactions.'''

        db.session.rollback()

    def set_followers(self):
        '''Set followers for users.'''

        f1 = Follows(
                user_being_followed_id=self.user1.id,
                user_following_id=self.testuser.id)
        
        f2 = Follows(
                user_being_followed_id=self.testuser.id,
                user_following_id=self.user2.id)

        # add followers to db
        db.session.add_all([f1, f2])
        db.session.commit()

    def test_users_followers(self):
        '''Test for user followers.'''

        # initiate followers
        self.set_followers()

        with self.client as c:
            resp = c.get(f'/users/{self.testuser.id}')

            self.assertEqual(resp.status_code, 200)
            
            test_user = User.query.get(101)

            self.assertEqual(test_user.following[0].id, 202)

            u1 = User.query.get(303)

            self.assertEqual(u1.following[0].id, 101)


    def test_unauthorized_add_like(self):
        ''' Test for when user tries to like their own message.
            It should fail.
        '''
        
        msg = Message(
            id=123,
            text='This is a message!',
            user_id=self.testuser.id
        )

        db.session.add(msg)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id
            
            resp = c.post('/users/add_like/123', follow_redirects=True)

            self.assertEqual(resp.status_code, 403)
            self.assertIn('403 Forbidden', str(resp.data))
        

    def test_add_like(self):
        '''Test for when user likes another user's message.'''

        msg = Message(
            id=110,
            text='This is a message!',
            user_id=self.user1.id
        )

        db.session.add(msg)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.post('/users/add_like/110', follow_redirects=True)

            self.assertEqual(resp.status_code, 200)

            user = User.query.get(101)

            self.assertEqual(user.likes[0].id, 110)

    
    def test_remove_like(self):
        '''Tests for user ability to unlike a message.'''

        m = Message(
            id=110,
            text='This is a message!',
            user_id=self.user1.id
        )

        db.session.add(m)
        db.session.commit()

        l = Likes(user_id=self.testuser.id, message_id=110)

        db.session.add(l)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id
            
            # make sure user liked message
            user = User.query.get(101)

            self.assertEqual(user.likes[0].id, 110)

            # for when user unlikes message
            resp = c.post('/users/add_like/110', follow_redirects=True)

            self.assertEqual(resp.status_code, 200)

            likes = Likes.query.filter_by(message_id=110).all()

            self.assertEqual(len(likes), 0)