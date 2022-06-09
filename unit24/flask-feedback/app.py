from flask import Flask, redirect, render_template, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User
from forms import UserForm, LoginForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///flask_feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'thesecretishere'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def main_page():
    '''Main page redirects to user registration.'''

    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    '''Display and process user registration form.'''

    form = UserForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username, password, email, first_name, last_name)

        # add user db
        db.session.add(new_user)

        try:
            # commit user to db
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Please pick another')

            return render_template('/users/register.html', form=form)

        # add user to session when registered
        session['username'] = new_user.username

        # Let user know that they are registered
        flash('Thanks for registering!')

        return redirect('/secret')
    else:
        return render_template('/users/register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_user():
    '''Displays and processes login form for user.'''

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        # authenticate user
        user = User.authenticate(username, password)

        if user:
            flash(f'{user.username} logged in')

            #add user to session when logged in
            session['username'] = user.username

            return redirect('/secret')
        else:
            form.username.errors = ['Invalid username/password']
    
    return render_template('/users/login.html', form=form)

@app.route('/secret')
def secret_page():

    if 'username' not in session:
        flash('Please login first!')

        return redirect('/login')

    return render_template('secret.html')