from .db import db



class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    #relationships
    song = db.relationship('Song')
    user = db.relationship('User')

    def to_dict(self):
        return {
            'id': self.id,

        }
