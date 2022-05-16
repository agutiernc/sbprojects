"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'thesecretishere'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def main_page():
    '''Root redirects to users page '''

    return redirect('/users')

@app.route('/users')
def list_users():
    '''List all users in db'''

    # get all users
    users = User.query.all()

    return render_template('index.html', users=users)

@app.route('/users/<int:user_id>')
def show_user(user_id):
    '''Display details about a user'''

    # get user info
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

    # get user info
    user = User.query.get_or_404(user_id)

    # delete user and commit to db
    db.session.delete(user)
    db.session.commit()

    return redirect('/')

# -- Post routes --

@app.route('/users/<int:user_id>/posts/new')
def show_post_form(user_id):
    '''Displays post form for a user'''

    # get user info
    user = User.query.get_or_404(user_id)

    return render_template('/posts/new.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def add_post(user_id):
    '''Create a post for user'''
    
    # get user
    user = User.query.get_or_404(user_id)
    
     # grab data from form
    title = request.form['title']
    content = request.form['content']

    # add data to class
    new_post = Post(title=title, content=content, user=user)

    # add & commit to db
    db.session.add(new_post)
    db.session.commit()

    # inform user post was successfully added
    flash(f"Post '{new_post.title}' was added")

    return redirect(f'/users/{user_id}')

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    '''Display a post'''

    # get post info
    post = Post.query.get_or_404(post_id)

    return render_template('/posts/show.html', post=post)

@app.route('/posts/<int:post_id>/edit')
def show_post_edit_form(post_id):
    '''Display form to edit post'''

    # get post info
    post = Post.query.get_or_404(post_id)

    return render_template('/posts/edit.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def edit_post(post_id):
    '''Edit a post'''

    # get post info
    post = Post.query.get_or_404(post_id)

    # grab data from form
    post.title = request.form['title']
    post.content = request.form['content']

    # add and commit to db
    db.session.add(post)
    db.session.commit()

    # inform user post was successfully updated
    flash(f"Post '{post.title}' was updated.")

    return redirect(f'/posts/{post_id}')

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    '''Delete post from db'''

    # get post info
    post = Post.query.get_or_404(post_id)

    # delete user and commit to db
    db.session.delete(post)
    db.session.commit()

    # inform user post was successfully deleted
    flash(f"Post '{post.title}' was deleted.")

    return redirect(f"/users/{post.user_id}")