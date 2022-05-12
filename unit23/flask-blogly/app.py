"""Blogly application."""

from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'thesecretishere'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)
# db.create_all()

@app.route('/')
def main_page():
    return redirect('/users')

@app.route('/users')
def list_users():
    '''List all users in db'''

    users = User.query.all()

    return render_template('index.html', users=users)

@app.route('/users/<int:user_id>')
def show_user(user_id):
    '''Display details about a user'''

    user = User.query.get_or_404(user_id)

    print('user info: ', user)
    return render_template('show.html', user=user)