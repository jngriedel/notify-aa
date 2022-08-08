from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Playlist, db
from flask_wtf.csrf import validate_csrf

#aws imports
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

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

@user_routes.route('/update', methods=['PUT'])
@login_required
def user_update():
    try:
        validate_csrf(request.cookies['csrf_token'])
    except:
        return {'errors': ['Invalid csrf token']}, 400


    user = User.query.get(current_user.id)
    url =   user.image_url
    if "image" not in request.files:
        user.username = request.form.get('username')
        db.session.commit()
        return {'user': user.to_dict()}

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    user.image_url = url
    user.username = request.form.get('username')
    db.session.commit()
    return {'user': user.to_dict()}
