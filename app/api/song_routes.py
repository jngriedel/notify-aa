from flask import Blueprint, jsonify, request
from app.models import db, Song
from flask_login import login_required, current_user
from app.forms import SongForm
from app.models import User

#aws imports
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

song_routes = Blueprint('songs', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@song_routes.route("/mp3", methods=["POST"])
@login_required
def upload_mp3():
    if "mp3" not in request.files:
        return {"errors": "mp3 file required"}, 400

    mp3 = request.files["mp3"]

    if not allowed_file(mp3.filename):
        return {"errors": "file type not permitted"}, 400

    mp3.filename = get_unique_filename(mp3.filename)

    upload = upload_file_to_s3(mp3)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request

    return {"url": url}


@song_routes.route('/')
@login_required
def songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}


@song_routes.route('/', methods=['POST'])
@login_required
def new_song(id):
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # data = request.json


        add_song = Song(
            name = form['name'],
            album = form['album'],
            artist = form['artist'],
            genre = form['genre'],
            mp3_url = form['mp3_url'],
            user_id = current_user.id,

        )
        db.session.add(add_song)
        db.session.commit()
        return{
            "song": song.to_dict()
        }

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
