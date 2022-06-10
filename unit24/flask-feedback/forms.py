from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField, TextAreaField
from wtforms.validators import InputRequired, Length, Email

class UserForm(FlaskForm):
    '''User registration form.'''

    username = StringField('Username', 
                validators=[
                    InputRequired(),
                    Length(min=5, max=20,
                        message='Username must be 5 to 20 characters long')
                    ])

    password = PasswordField('Password', validators=[InputRequired()])

    email = EmailField('Email',
                validators=[
                    InputRequired(),
                    Email(),
                    Length(min=3, max=50)
                ])

    first_name = StringField('First Name', 
                    validators=[
                        InputRequired(),
                        Length(min=3, max=30)
                    ])

    last_name = StringField('Last Name', 
                    validators=[
                        InputRequired(),
                        Length(min=3, max=30)
                    ])

class LoginForm(FlaskForm):
    '''Login Form'''

    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])

class FeedbackForm(FlaskForm):
    '''Feedback form.'''

    title = StringField('Title', validators=[InputRequired(), Length(max=100)])

    content = TextAreaField('Content', 
                    render_kw={'class': 'form-control', 'rows': 5},
                    validators=[InputRequired()]
                )