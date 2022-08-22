from flask import Blueprint, jsonify, request
from app.models import db, Song, User, Like
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf



# #aws imports
# from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

like_routes = Blueprint('likes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'*{error}')
    return errorMessages




@like_routes.route('/', methods=['POST'])
@login_required
def like_song():
    data = request.json

    song_id = data['song_id']
    new_like = Like( user_id = current_user.id, song_id = song_id)
    db.session.add(new_like)
    db.session.commit()
    liked_song = Song.query.get(song_id)
    return {'song': liked_song.to_dict()}

@like_routes.route('/remove', methods=['POST'])
@login_required
def remove_like():
    data = request.json
    song_id = data['song_id']
    to_remove = Like.query.filter(Like.user_id == current_user.id, Like.song_id == song_id).scalar()
    db.session.delete(to_remove)
    db.session.commit()
    return {'message': 'Success!'}

@like_routes.route('')
@login_required
def get_likes():
    user_likes = Like.query.filter(Like.user_id == current_user.id).all()
    liked_songs = []
    for like in user_likes:
        liked_songs.append(Song.query.get(like.song_id))
    return {'liked_songs': [song.to_dict() for song in liked_songs]}
