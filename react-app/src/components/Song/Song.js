import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {deleteSong, editSong} from '../../store/song'
import { useMusicContext } from '../context/MusicContext';
import no_playlist from "../../images/no_playlist.PNG"
import play_white from '../../images/play_white.jpg'
import SongOptionsModal from '../SongOptionsModal/SongOptionsModal';
import './Song.css'
function Song({song, i, playlistId}) {
  const sessionUser = useSelector(state=> state.session.user)
  const [name, setName] = useState(song.name);
  const [errors, setErrors] = useState([])
  const [album, setAlbum] = useState(song.album);
  const [artist, setArtist] = useState(song.artist);
  const [genre, setGenre] = useState(song.genre);
  const [edit, setEdit] = useState(false)
  
  const [showPlay, setShowPlay] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const dispatch = useDispatch()
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()



  const handleDelete = async() =>{
    let result = window.confirm("This song will be gone forever. Are you sure?");
    if (result) dispatch(deleteSong(song.id))

  }

  const handlePlay = async() => {
    setClearAudioList(true)

    const audioListTemp = []

    audioListTemp.push({
      name: song.name,
      singer: song.artist,
      musicSrc: song.mp3_url,
      cover: song.image_url ? song.image_url : no_playlist
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



  const doubleClick = event => {
    if (event.detail === 2){
      handlePlay()
    }
  }

  return (
    <>
    {!edit &&
    <div className='song-container'
     onMouseEnter={() => setShowPlay(true)}
        onMouseLeave={() => setShowPlay(false)}
        onClick={doubleClick}>
        <SongOptionsModal song={song}   showDropDown={showDropDown} setShowDropDown={setShowDropDown} handleDelete={handleDelete} playlistId={playlistId}/>
        {showPlay && <img onClick={handlePlay} className='play-on-song' alt='play' src={play_white} />}
        {!showPlay && <p className='number-and-play-num'>{i + 1}</p>}
        <div className='song-title'>
        <img className='song-image' src={song.image_url? song.image_url : no_playlist} />
          <div className='song-name-artist'>
            <p>{song.name}</p>
            <p className='song-artist'>{song.artist}</p>
          </div>
        </div>
        <p>{song.album}</p>
      <div className='song-buttons'>
        <button style={{visibility: sessionUser.id === song.user_id? 'visible': 'hidden'}} onClick={()=>setEdit(true)} type='button'>Edit</button>
        {showPlay && <i onClick={()=>setShowDropDown(true)} class="fa-solid fa-ellipsis"></i>}


        {/* {playlistId && <button type='button' onClick={handleRemoveFromPlaylist} >Remove From Playlist</button> } */}
      </div>


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
