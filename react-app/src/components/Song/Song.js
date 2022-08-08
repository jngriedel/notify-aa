import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {deleteSong, editSong} from '../../store/song'
import { useMusicContext } from '../context/MusicContext';
import no_playlist from "../../images/no_playlist.PNG"
import play_white from '../../images/play_white.jpg'
import SongOptionsModal from '../SongOptionsModal/SongOptionsModal';
import EditSongModal from '../EditSongModal/EditSongModal';
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

    <div className='song-container'
     onMouseEnter={() => setShowPlay(true)}
        onMouseLeave={() => setShowPlay(false)}
        onClick={doubleClick}>
        <SongOptionsModal song={song}   showDropDown={showDropDown} setShowDropDown={setShowDropDown} handleDelete={handleDelete} playlistId={playlistId} setEdit={setEdit} />
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

        {showPlay && <i onClick={()=>setShowDropDown(true)} class="fa-solid fa-ellipsis fa-lg"></i>}



      </div>


    </div>
    <EditSongModal edit={edit} setEdit={setEdit} song={song} setShowDropDown={setShowDropDown} />


   </>
  );
}
export default Song
