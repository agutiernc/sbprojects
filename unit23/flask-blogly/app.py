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
    '''Root redirects to users page '''

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

    return render_template('show.html', user=user)

@app.route('/users/new')
def users_form():
    '''Display new users form'''

    return render_template('/new.html')

@app.route('/users/new', methods=['POST'])
def create_user():
    '''New User creation form submission'''

    # grab data from form
    f_name = request.form['first']
    l_name = request.form['last']
    img_url = request.form['url'] or None

    # create new user for db
    new_user = User(first_name=f_name, last_name=l_name, image_url=img_url)

    # add to db
    db.session.add(new_user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/edit')
def show_edit(user_id):
    '''Display user info for edit page'''

    # get user info
    user = User.query.get_or_404(user_id)

    return render_template('edit.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def edit_user(user_id):
    '''Edit user info'''

    # get user info
    user = User.query.get_or_404(user_id)

    # assign new or existing info to user
    user.first_name = request.form['first']
    user.last_name = request.form['last']
    user.image_url = request.form['url'] or None

    # add and commit user to DB
    db.session.add(user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    '''Delete user from db'''

    # get user
    user = User.query.get_or_404(user_id)

    # delete user and commit to db
    db.session.delete(user)
    db.session.commit()

    return redirect('/')

