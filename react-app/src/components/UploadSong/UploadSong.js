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



  const handleSubmit = async (e) => {
    e.preventDefault();
    setMp3Errors([])
    const formData = new FormData();
    formData.append("mp3", mp3);



    const res = await fetch('/api/songs/mp3', {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();

        const song = {
            name,
            album,
            artist,
            genre,
            mp3_url: data.url,
        }
        const response = await dispatch(newSong(song))

        if (response.song) {
          setAlbum('')
          setName('')
          setArtist('')
          setGenre('Classical')
        }
        else{
          setMp3Errors(response)
        }
    }
    else {
        const data = await res.json();

        setMp3Errors(data.errors)

    }
}

const updateMp3 = (e) => {
    const file = e.target.files[0];
    setMp3(file);
}




  return (
    <>
      <form
        className='uploadSong-form'
        onSubmit={handleSubmit}>

            <label>Song Name</label>
            <input
                  className="upload-songname"
                  placeholder="Song Name"
                  type="text"
                  name="song"
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Album</label>
            <input
                  className="upload-album"
                  placeholder="Album"
                  type="text"
                  name="album"
                  onChange={(e)=>setAlbum(e.target.value)}
                  value={album}
                ></input>
            <label>Artist</label>
            <input
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
