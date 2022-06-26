"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

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


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()

    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()

            self.assertEqual(msg.text, "Hello")
    
    def test_add_message_no_session(self):
        '''Test if unauthorized user can add message.'''

        with self.client as c:
            resp = c.post("/messages/new",
                            data={"text": "Hello"},
                            follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Access unauthorized', str(resp.data))


    def test_get_single_message(self):
        '''Show a single message.'''

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

            m = Message.query.get(123)
            
            resp = c.get(f'/messages/{m.id}')

            self.assertEqual(resp.status_code, 200)
            self.assertIn(m.text, str(resp.data))

    def test_deleted_message(self):
        '''Delete a message.'''

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

            url = f'/messages/123/delete'
            resp = c.post(url, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)

            # get message after it was deleted
            m = Message.query.get(123)
            
            # assure that message was deleted
            self.assertIsNone(m)

    def test_unauthorized_message_delete(self):
        '''Test for unauthorized message deletion.'''

        user2 = User.signup(
                        username="joker", 
                        email="joker@haha.ha",
                        password="hatebats",
                        image_url=None)

        user2.id = 111

        msg = Message(
            id=123,
            text='This is a message!',
            user_id=self.testuser.id
        )

        db.session.add_all([user2, msg])
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = 111

            url = f'/messages/123/delete'
            resp = c.post(url, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Access unauthorized.', str(resp.data))






