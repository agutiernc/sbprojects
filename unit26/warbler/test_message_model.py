"""Message model tests."""

import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app

class MessageModelTestCase(TestCase):
    '''Tests model for Message.'''

    def setUp(self):
        '''Create test client, add sample data.'''

        db.drop_all()
        db.create_all()

        user1 = User.signup(
            username='tester1', 
            email='user1@tester.com', 
            password='pswd1',
            image_url=None)
        
        user1.id = 1

        db.session.commit()

        self.u1 = User.query.get(user1.id)

        self.client = app.test_client()
    
    def tearDown(self):
        """Clean up fouled transactions."""

        db.session.rollback()

    
    def test_message_mode(self):
        """Does basic model work?"""

        msg = Message(text='This is just a test!', user_id=self.u1.id)

        db.session.add(msg)
        db.session.commit()

        self.assertEqual(len(self.u1.messages), 1)
        self.assertEqual(self.u1.messages[0].text, 'This is just a test!')
        self.assertEqual(self.u1.messages[0].user_id, self.u1.id)

    
    def test_message_likes(self):
        '''Test if message has any likes.'''

        msg = Message(text='This was liked!', user_id=self.u1.id)
        
        db.session.add(msg)
        db.session.commit()

        user = self.u1

        user.likes.append(msg)

        db.session.commit()

        liked_msg = Likes.query.filter(Likes.user_id == user.id).all()

        self.assertEqual(len(liked_msg), 1)
        self.assertEqual(liked_msg[0].message_id, msg.id)

