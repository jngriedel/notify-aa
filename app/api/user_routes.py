from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Playlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:user_id>/playlists')
@login_required
def user_playlists(user_id):
    playlists = Playlist.query.filter(current_user.id == user_id )
    return {'playlists': [playlist.to_dict() for playlist in playlists]}
