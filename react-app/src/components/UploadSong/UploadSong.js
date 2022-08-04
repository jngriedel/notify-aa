import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {newSong} from '../../store/song'

function UploadSong() {

  const dispatch = useDispatch()
  const sessionUser = useSelector(state=> state.session.user)
  const [mp3errors, setMp3Errors] = useState([])
  const [mp3, setMp3] = useState(null);
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('Classical');
  const [image, setImage] = useState(null);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setMp3Errors([])
    const form = new FormData();
    form.append("mp3", mp3);
    form.append("image", image)
    form.append("name", name)
    form.append("album", album)
    form.append("artist", artist)
    form.append("genre", genre)


    const response = await dispatch(newSong(form))

      if (response.song) {
        setAlbum('')
        setName('')
        setArtist('')
        setGenre('Classical')
        setImage(null)
        setMp3(null)
      }
      else{
        setMp3Errors(response)
      }
    }



const updateMp3 = (e) => {
    const file = e.target.files[0];
    setMp3(file);
}
const updateImage = (e) => {
  const file = e.target.files[0];
  setImage(file);
}




  return (
    <>
      <form
        className='uploadSong-form'
        onSubmit={handleSubmit}>

            <label>Song Name</label>
            <input
                  required
                  className="upload-songname"
                  placeholder="Song Name"
                  type="text"
                  name="song"
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Album</label>
            <input
                  required
                  className="upload-album"
                  placeholder="Album"
                  type="text"
                  name="album"
                  onChange={(e)=>setAlbum(e.target.value)}
                  value={album}
                ></input>
            <label>Artist</label>
            <input
                  required
                  className="upload-artist"
                  placeholder="Artist"
                  type="text"
                  name="artist"
                  onChange={(e)=>setArtist(e.target.value)}
                  value={artist}
                ></input>
            <label className = "genre-label">Genre</label>
            <select
                className="genre-select-options"
                name="genre"
                id="selectoption"
                onChange={(e)=>setGenre(e.target.value)}
                value={genre}
            >
                <option value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Jazz">Jazz</option>
                <option value="Metal">Metal</option>
                <option value="Pop">Pop</option>
                <option value="Rap">Rap</option>
                <option value="Rock">Rock</option>
                <option value="Other">Other</option>
            </select>

            <label>Album Cover (Optional) </label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />


            <input
              type="file"
              accept=".mp3"
              onChange={updateMp3}
            />
            <button type="submit">Upload</button>

        </form>
        <div className="errorsList">
          {mp3errors && mp3errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
    </>
  );
}

export default UploadSong
