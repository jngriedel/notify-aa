from flask import Blueprint, jsonify, request
from app.models import db, Playlist, Playlist_Join, Song
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf



#aws imports
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

playlist_join_routes = Blueprint('playlist_joins', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages





# @playlist_join_routes.route('/<int:playlist_id>')
# @login_required
# def playlist_songs(playlist_id):
#     join_songs = Playlist_Join.query.filter(Playlist_Join.playlist_id == playlist_id)

#     return {'songs': 'Success!'}

@playlist_join_routes.route('/', methods=['POST'])
@login_required
def playlists():
    data = request.json
    playlist_id = data['playlist_id']
    song_id = data['song_id']
    possible_join = Playlist_Join.query.filter(Playlist_Join.playlist_id == playlist_id, Playlist_Join.song_id == song_id).scalar()

    if possible_join:
        return {'message': 'Song already in Playlist!'}

    new_join = Playlist_Join(playlist_id = playlist_id, song_id = song_id)
    db.session.add(new_join)
    db.session.commit()
    return {'message': 'Success!'}

@playlist_join_routes.route('/', methods=['DELETE'])
@login_required
def remove_song():
    data = request.json
    playlist_id = data['playlist_id']
    song_id = data['song_id']
    to_remove = Playlist_Join.query.filter(Playlist_Join.playlist_id == playlist_id, Playlist_Join.song_id == song_id).scalar()
    db.session.delete(to_remove)
    db.session.commit()
    return {'message': 'Success!'}
