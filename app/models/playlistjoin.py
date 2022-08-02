from .db import db



class Playlist_Join(db.Model):
    __tablename__ = 'playlistjoins'

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)


    #relationships
    song = db.relationship('Song')
    playlist = db.relationship('Playlist')

    def to_dict(self):
        return {
            'id': self.id,

        }
