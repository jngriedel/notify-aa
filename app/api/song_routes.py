from flask import Blueprint, jsonify, request
from app.models import db, Song
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.forms import SongForm
from app.models import User

#aws imports
from app.aws import (upload_file_to_s3, allowed_file, allowed_image_file, get_unique_filename)

song_routes = Blueprint('songs', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'*{error}')
    return errorMessages



@song_routes.route('')
@login_required
def all_songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/<int:user_id>')
@login_required
def user_songs(user_id):
    songs = Song.query.filter(current_user.id == Song.user_id )
    return {'songs': [song.to_dict() for song in songs]}




@song_routes.route('', methods=['POST'])
@login_required
def new_song():
    try:
        validate_csrf(request.cookies['csrf_token'])
    except:
        return {'errors': ['Invalid csrf token']}, 400

    # all_errors = []

    ## Validate Text Fiels
    if len(request.form.get('name')) > 100:
        return {"errors": ["Song name cannot exceed 100 characters"]}, 400

    if len(request.form.get('album')) > 100:
        return {"errors": ["Album name can not exceed 100 characters"]}, 400

    if len(request.form.get('artist')) > 100:
        return {"errors": ["Artist name can not exceed 100 characters"]}, 400

    ## Validate image if Image
    image_url = None

    if "image" in request.files:
        # return {"errors": ["Image file required"]}, 400

        image = request.files["image"]

        if not allowed_image_file(image.filename):
            return {"errors": ["Image must be a .jpg, .jpeg, or .png"]}, 400


        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        image_url = upload["url"]

    ## Validate and upload mp3
    if "mp3" not in request.files:
        return {"errors": ["mp3 file required"]}, 400

    mp3 = request.files["mp3"]

    if not allowed_file(mp3.filename):
        return {"errors": ["file type not permitted"]}, 400

    mp3.filename = get_unique_filename(mp3.filename)

    upload = upload_file_to_s3(mp3)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    mp3_url = upload["url"]
    # flask_login allows us to get the current user from the request

    # if len(all_errors) > 0:
    #     return {'errors'; all_errors}





    add_song = Song(
            name = request.form.get('name'),
            album = request.form.get('album'),
            artist = request.form.get('artist'),
            genre = request.form.get('genre'),
            image_url = image_url,
            mp3_url = mp3_url,
            user_id = current_user.id,

        )

    db.session.add(add_song)
    db.session.commit()
    return {"song": add_song.to_dict()}
















@song_routes.route('/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id):
    song = Song.query.get(song_id)
    db.session.delete(song)
    db.session.commit()

    return {'songId': song_id}

@song_routes.route('/<int:song_id>', methods=['PATCH'])
@login_required
def update_song(song_id):
    song = Song.query.get(song_id)
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # data = request.json

        song.name = form.data['name'],
        song.album = form.data['album'],
        song.artist = form.data['artist'],
        song.genre = form.data['genre'],
        db.session.commit()

        return {'song': song.to_dict()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
