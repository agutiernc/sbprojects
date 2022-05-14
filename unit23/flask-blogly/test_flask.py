from unittest import TestCase

from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# ignore Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class BloglyTestCase(TestCase):
    '''Tests for Users'''

    def setUp(self):
        '''Add sample user'''

        User.query.delete()

        user = User(
            first_name='Bruce',
            last_name = 'Wayne',
            image_url= 'https://cdn-icons-png.flaticon.com/512/2919/2919600.png'
        )
        
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        self.user = user

        print('user id:', self.user_id)
        print('user: ', self.user)

    def tearDown(self):
        '''Clean up any fouled transaction'''

        db.session.rollback()
    
    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Bruce Wayne', html)

    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h2>Bruce Wayne</h2>', html)
            self.assertIn(self.user.last_name, html)
    
    def test_create_user(self):
        with app.test_client() as client:
            d = {
                "first": "Harley",
                "last": "Quinn",
                "url": "https://cdn-icons-png.flaticon.com/512/2919/2919600.png"
            }
            resp = client.post("/users/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Harley Quinn', html)
    
    def test_show_edit(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}/edit")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<input type="text" name="first" value="Bruce">', html)
