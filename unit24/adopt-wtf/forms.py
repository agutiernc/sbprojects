from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, Optional, NumberRange, URL, AnyOf

class AddPetForm(FlaskForm):
    '''Form for adding pets'''

    name = StringField('Pet Name', 
                validators=[InputRequired(message="Name required")])

    species = StringField('Species',
                validators=[
                    InputRequired(message="Species required"),
                    AnyOf(values=["dog", "cat", "mouse", "porcupine"],
                            message="Please enter a valid species")
                ])

    photo_url = StringField('Photo URL',
                validators=[
                    Optional(),
                    URL(require_tld=True, message="Valid URL only")
                ])

    age = IntegerField('Age',
                validators=[Optional(), NumberRange(min=0, max=30)])

    notes = TextAreaField('Notes', validators=[Optional()])
    