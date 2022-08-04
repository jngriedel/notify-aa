import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {deleteSong, editSong} from '../../store/song'
import { useMusicContext } from '../context/MusicContext';
import './Song.css'
function Song({song}) {
  const sessionUser = useSelector(state=> state.session.user)
  const [name, setName] = useState(song.name);
  const [errors, setErrors] = useState([])
  const [album, setAlbum] = useState(song.album);
  const [artist, setArtist] = useState(song.artist);
  const [genre, setGenre] = useState(song.genre);
  const [edit, setEdit] = useState(false)
  const [addToPlaylist, setAddToPlaylist] = useState(false)
  const dispatch = useDispatch()
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()



  const handleDelete = async() =>{
    dispatch(deleteSong(song.id))
  }

  const handlePlay = async() => {
    setClearAudioList(true)

    const audioListTemp = []

    audioListTemp.push({
      name: song.name,
      singer: song.artist,
      musicSrc: song.mp3_url
    })

    await setAudioLists(audioListTemp)

  }

  const handleCancelEdit = () =>{
    setAlbum(song.album)
    setArtist(song.artist)
    setName(song.name)
    setGenre(song.genre)
    setEdit(false)
  }

  const handleEdit = async(e) => {
    e.preventDefault();
    setErrors([])
    const updatedSong = {
        name,
        album,
        artist,
        genre,
        mp3_url: song.mp3_url,
        user_id: sessionUser.id
    }
    const response = await dispatch(editSong(song.id, updatedSong))

    if (response.song) {

      setEdit(false)
    }
    else{
      setErrors(response.errors)
    }
  }



  const handleAddToPlaylist = async (playlistId) => {
    const response = await fetch(`/api/playlistjoin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        playlist_id : playlistId,
        song_id : song.id
      }),

    });

    const data = await response.json()

    setAddToPlaylist(false)

  }

  return (
    <>
    {!edit &&
    <div className='song-container'>
        <p>{song.name}</p>
        <p>{song.artist}</p>
        <p>{song.album}</p>
        <p>{song.genre}</p>
        <button onClick={()=>setEdit(true)} type='button'>Edit</button>
        <button onClick={handleDelete} type='button'>Delete</button>
        <button onClick={handlePlay} type='button' >PLAY</button>
        { !addToPlaylist && <button onClick={()=>{setAddToPlaylist(true)}} type='button' >Add to Playlist</button>}
        {addToPlaylist &&
        <div className='playlist-dropdown'>
        {sessionUser.playlists.map((playlist,i)=>(
            <div key={i} onClick={()=>handleAddToPlaylist(playlist.id)} className='playlist-dropdown-option'>
              {playlist.name}
            </div>
        ))}
        <button onClick={()=>setAddToPlaylist(false)} type='button'>Cancel</button>
          </div>
        }

    </div>
    }
    {edit && <div className='song-container'>
    {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
    <form

        onSubmit={handleEdit}>

            <label>Name</label>
            <input


                  type="text"
                  name="song"
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Album</label>
            <input

                  type="text"
                  name="album"
                  onChange={(e)=>setAlbum(e.target.value)}
                  value={album}
                ></input>
            <label>Artist</label>
            <input

                  type="text"
                  name="artist"
                  onChange={(e)=>setArtist(e.target.value)}
                  value={artist}
                ></input>
            <label className = "genre-label">Genre</label>
            <select

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




        <button type='submit'>Save</button>
        <button type='button' onClick={handleCancelEdit}>Cancel</button>

        </form>



        </div>}

   </>
  );
}
export default Song
