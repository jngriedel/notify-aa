from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length




class PlaylistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(),  Length(max=100) ])
    description = StringField('description', validators=[Length(max=255) ])
    image_url = StringField('image_url')
    
