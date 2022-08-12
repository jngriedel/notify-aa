from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
def password_match(form, field):
    password = form.data['password']
    if password != field.data:
        raise ValidationError('Passwords must match')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(max=40)])
    email = StringField('email', validators=[DataRequired(), user_exists, Email('Please enter a valid email address.')])
    password = StringField('password', validators=[DataRequired(),  Length(min=10, message= 'Password must be at least 10 characters'), Length(max=50, message= 'Password is limited to 50 characters')])
    repeat_password = StringField('repeat_password', validators = [DataRequired(), password_match])
