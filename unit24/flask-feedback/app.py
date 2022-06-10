from flask import Flask, redirect, render_template, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import UserForm, LoginForm, FeedbackForm
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

        return redirect(f'/users/{username}')
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

            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password']
    
    return render_template('/users/login.html', form=form)

@app.route('/logout')
def logout_user():
    '''Logout user and remove from session'''

    session.pop('username')

    flash('Sucessfully logged out!')

    return redirect('/')

@app.route('/users/<username>')
def show_user(username):
    '''Render user's info.'''

    if 'username' not in session or username != session['username']:
        flash('Please login first!')

        return redirect('/login')

    # get user info
    user = User.query.filter_by(username=username).first()

    return render_template('users/show.html', user=user)

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    '''Remove the user from the database.'''

    if 'username' not in session or username != session['username']:
        flash('Please login first!')

        return redirect('/login')

    # get user info
    user = User.query.filter_by(username=username).first()

    # delete user from db
    db.session.delete(user)
    db.session.commit()

    # remove user from session
    session.pop('username')

    # notify deletion of user
    flash('User account deleted!')

    return redirect('/')


# ======= FEEDBACK routes ==========

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def user_feedback(username):
    '''Display and process user feedback form.'''

    if 'username' not in session or username != session['username']:
        flash('Please login first!')

        return redirect('/login')

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        # add data to Feedback
        new_fdbk = Feedback(title=title, content=content, username=username)

        # add and commit feedback to db
        db.session.add(new_fdbk)
        db.session.commit()

        # notify if feedback successfully added
        flash('Feedback added!')

        return redirect(f'/users/{new_fdbk.username}')
    else:
        return render_template('/feedback/new.html', form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def edit_feedback(feedback_id):
    '''Render and process form for updating specific feedback.'''

    # Get feedback data
    fdbk = Feedback.query.get_or_404(feedback_id)

    if 'username' not in session or fdbk.username != session['username']:
        flash('Unauthorized access: Please login first!')

        return redirect('/login')

    # get existing form data
    form = FeedbackForm(obj=fdbk)
    
    if form.validate_on_submit():
        fdbk.title = form.title.data
        fdbk.content = form.content.data

        # commit new data to database
        db.session.commit()

        # notify successful update
        flash('Feedback has been updated!')

        return redirect(f'/users/{fdbk.username}')
    else:
        return render_template('/feedback/edit.html', form=form)