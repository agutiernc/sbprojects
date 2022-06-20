from email import message
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, Length, InputRequired, URL


class MessageForm(FlaskForm):
    """Form for adding/editing messages."""

    text = TextAreaField('text', validators=[DataRequired()])


class UserAddForm(FlaskForm):
    """Form for adding users."""

    username = StringField('Username', validators=[DataRequired()])
    email = StringField('E-mail', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[Length(min=6)])
    image_url = StringField('(Optional) Image URL')


class LoginForm(FlaskForm):
    """Login form."""

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[Length(min=6)])

class ProfileForm(FlaskForm):
    '''Edit Profile Form.'''

    username = StringField('Username', 
                validators=[InputRequired(), Length(min=3, max=30)])

    email = StringField('Email',
                validators=[
                    Email(message='Please enter a valid email'),
                    Length(min=3, max=100)])
    
    location = StringField('Location',
                validators=[InputRequired(), Length(min=2, max=20)])
    
    image_url = StringField('Profile Image',
                    validators=[
                        URL(message='Please enter a valid URL'),
                        Length(min=7)])
    
    header_image_url = StringField('Header Image',
                            validators=[
                                URL(message='Please enter a valid URL'),
                                Length(min=7)])
    
    bio = TextAreaField('Bio',
            validators=[Length(min=3, max=30)],
            render_kw={'class': 'form-control', 'rows': 3})
    
    password = PasswordField('Password', validators=[InputRequired(), Length(min=6)])