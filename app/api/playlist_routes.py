from flask import Blueprint, jsonify, request
from app.models import db, Playlist
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.forms import PlaylistForm


#aws imports
from app.aws import (upload_file_to_s3, allowed_file, allowed_image_file, get_unique_filename)

playlist_routes = Blueprint('playlists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


@playlist_routes.route("", methods=["POST"])
@login_required
def new_playlist():
    try:
        validate_csrf(request.cookies['csrf_token'])
    except:
        return {'errors': ['other:Invalid csrf token. Please refresh and try again.']}, 400


    if len(request.form.get('name')) > 100:
        return {"errors": ["Name can not exceed 100 characters"]}, 400


    if len(request.form.get('description')) > 255:
        return {"errors": ["Description can not exceed 255 characters"]}, 400


    url = None

    if "image" in request.files:
        # return {"errors": ["Image file required"]}, 400

        image = request.files["image"]

        if not allowed_image_file(image.filename):
            return {"errors": ["image: Image must be a .jpg, .jpeg, or .png"]}, 400


        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]




    add_playlist = Playlist( name = request.form.get('name'), description = request.form.get('description'), user_id = current_user.id, image_url = url)
    db.session.add(add_playlist)
    db.session.commit()
    return {"playlist": add_playlist.to_dict()}



@playlist_routes.route('/')
@login_required
def playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


@playlist_routes.route('/<int:playlist_id>')
@login_required
def user_playlists(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if playlist:
        return {'playlist': playlist.to_dict()}
    else :
        return {'message': 'No Playlist'}




@playlist_routes.route('/<int:playlist_id>', methods=['DELETE'])
@login_required
def delete_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    db.session.delete(playlist)
    db.session.commit()

    return {'playlistId': playlist_id}

@playlist_routes.route('/<int:playlist_id>', methods=['PATCH'])
@login_required
def edit_playlist(playlist_id):
    try:
        validate_csrf(request.cookies['csrf_token'])
    except:
        return {'errors': ['other:Invalid csrf token. Please refresh and try again.']}, 400

    playlist = Playlist.query.get(playlist_id)

    if len(request.form.get('name')) > 100:
        return {"errors": ["Name can not exceed 100 characters"]}, 400

    if len(request.form.get('description')) > 255:
        return {"errors": ["Description can not exceed 255 characters"]}, 400


    if request.form.get('name'):
        playlist.name = request.form.get('name')

    if request.form.get('description'):
        playlist.description = request.form.get('description')

    if "image" in request.files:
        # return {"errors": ["Image file required"]}, 400

        image = request.files["image"]

        if not allowed_image_file(image.filename):
            return {"errors": ["image:Image must be a .jpg, .jpeg, or .png"]}, 400


        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        playlist.image_url = url

    db.session.commit()
    return {'playlist': playlist.to_dict()}
