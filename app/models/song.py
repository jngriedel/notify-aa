from .db import db



class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    album = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    mp3_Url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #relationships

    user = db.relationship('User', back_populates='songs')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ablum': self.ablum,
            'artist': self.artist,
            'genre': self.genre
        }
