from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length




class SongForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(),  Length(max=100) ])
    album = StringField('album', validators=[DataRequired(),  Length(max=100) ])
    artist = StringField('artist', validators=[DataRequired(),  Length(max=100) ])
    genre = SelectField('genre', validators=[DataRequired()], choices=['Classical', 'Country', 'Electronic', 'Jazz', 'Metal',  'Pop', 'Rap', 'Rock', 'Other'])
    mp3_url = StringField('mp3_url', validators=[DataRequired()])
