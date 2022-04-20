from unittest import TestCase
from app import app
from flask import session

class FlaskTests(TestCase):

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        '''Test the session and HTML'''

        with self.client:
            response = self.client.get('/')

            self.assertIn('board', session)
            self.assertIsNone(session.get('high_score'))
            self.assertIsNone(session.get('plays'))
            self.assertIn(b'Score:', response.data)

    def test_valid_word(self):
        '''Check to see if a word is valid'''

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [
                    ['A', 'X', 'R', 'J', 'E'],
                    ['H', 'C', 'W', 'Q', 'G'],
                    ['Y', 'C', 'G', 'J', 'C'],
                    ['F', 'V', 'I', 'M', 'O'],
                    ['R', 'G', 'W', 'O', 'M']
                ]

        response1 = self.client.get('/verify?word=com')
        response2 = self.client.get('/verify?word=moo')
        response3 = self.client.get('/verify?word=wow')

        self.assertEqual(response1.json['result'], 'not-word')
        self.assertEqual(response2.json['result'], 'ok')
        self.assertEqual(response3.json['result'], 'not-on-board')

