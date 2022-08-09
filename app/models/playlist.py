from .db import db
from .playlistjoin import Playlist_Join



class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    #relationships
    user = db.relationship('User', back_populates='playlists')
    songs = db.relationship('Song', secondary='playlistjoins', back_populates='playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'songs': {song.id:song.to_dict() for song in self.songs},
            
        }
