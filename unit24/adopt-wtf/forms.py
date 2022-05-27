from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, Optional, Length, URL

class AddPetForm(FlaskForm):
    '''Form for adding pets'''

    name = StringField('Pet Name', 
                validators=[InputRequired(message="Name required")])
    species = StringField('Species',
                validators=[InputRequired(message="Species required")])
    photo_url = StringField('Photo URL',
                validators=[
                    Optional(),
                    URL(require_tld=True, message="Valid URL only")
                ])
    age = IntegerField('Age', validators=[Optional()])
    notes = TextAreaField('Notes', validators=[Optional()])
    