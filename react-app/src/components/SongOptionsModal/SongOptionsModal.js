import React, { useEffect, useState, useRef } from 'react';
import { Modal } from '../context/Modal.js';
import triangle_right from '../../images/triangle_right.png'
import triangle_left from '../../images/triangle_left.png'
import { useMusicContext } from '../context/MusicContext';
import no_playlist from "../../images/no_playlist.PNG"
import { removeSong } from '../../store/song';
import './SongOptionsModal.css'
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getPlaylists} from '../../store/playlist'


function SongOptionsModal({showDropDown, setShowDropDown, setEdit, handleDelete, song, playlistId, i}) {
  const dispatch = useDispatch()
  const playlists = useSelector(state=>state.playlist)
  const [showPlaylists, setShowPlaylists] = useState(false)
  const sessionUser = useSelector(state=> state.session.user)
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()
  const ref = useRef()
  // useEffect(()=> {
  //   dispatch(getPlaylists(sessionUser.id))
  // },[])

  useEffect(() => {
    const outsideClick = e => {
      // Close if clicked on other element
      if (showDropDown && ref.current && !ref.current.contains(e.target)) {
           setShowDropDown(false)
      }
    }
      document.addEventListener("mousedown", outsideClick)
    return () => {
     // Cleanup return function
        document.removeEventListener("mousedown", outsideClick)
    }
  }, [showDropDown])


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

    setShowPlaylists(false)
    setShowDropDown(false)

  }

  const handleAddToQueue = async() => {


    const audioListTemp = []
    setClearAudioList(false)

    audioListTemp.push({
      name: song.name,
      singer: song.artist,
      musicSrc: song.mp3_url,
      cover: song.image_url ? song.image_url : no_playlist
    })

    await setAudioLists(audioListTemp)

  }

  const handleRemoveFromPlaylist = async () => {
    const response = await fetch(`/api/playlistjoin/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          playlist_id : playlistId,
          song_id : song.id
        }),
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(removeSong(song.id))
        setShowDropDown(false)
    }
  }


  // for preview only
  const path = useLocation()
  if (path.pathname === '/home' || path.pathname ==='/search') {
    return (
      <>
      {showDropDown && (
        <div className='song-options-modal-wrapper-home' ref={ref}>


            <ul  className='songoptions-dropdown'>
            <li
                onClick={()=>{handleAddToQueue(); setShowDropDown(false);}}
                >
                    Add to Queue </li>
              {playlistId && <li
              style={{ visibility: sessionUser.id === song.user_id ? 'visible' : 'hidden' }}
              onClick={handleRemoveFromPlaylist} >Remove from playlist</li>}
              { Object.values(playlists).length > 0 && <li
                onMouseEnter={() => setShowPlaylists(true)}
                onMouseLeave={() => setShowPlaylists(false)}>
                Add to Playlist <img className='triangle-songoptions' alt='triangle' src={triangle_right} /></li>}
            </ul>

            {showPlaylists &&
              <ul onMouseEnter={() => setShowPlaylists(true)} className={ i === 0? 'playlist-dropdown' : 'playlist-dropdown-preview'}>
                {Object.values(playlists).map((playlist, i) => (
                  <li key={i} onClick={() => handleAddToPlaylist(playlist.id)} className='playlist-dropdown-option'>
                    {playlist.name}
                  </li>
                ))}

              </ul>
            }



      </div>
      )}
      </>
    )
  }

  // normal options on profile
  return (
    <>
      {showDropDown && (
        <div className='song-options-modal-wrapper' ref={ref}>


            <ul  className='songoptions-dropdown'>
                <li
                onClick={()=>{handleAddToQueue(); setShowDropDown(false);}}
                >
                    Add to Queue </li>
                { sessionUser.id === song.user_id &&       <li  onClick={()=>setEdit(true)}>Edit</li>}
                {  sessionUser.id === song.user_id && <li  onClick={handleDelete}>Delete</li> }
                {playlistId && <li   onClick={handleRemoveFromPlaylist} >Remove from playlist</li> }
                <li
                onMouseEnter={() => setShowPlaylists(true)}
                onMouseLeave={() => setShowPlaylists(false)}>
                    Add to Playlist <img className='triangle-songoptions' alt='triangle' src={triangle_right} /></li>
            </ul>

            {showPlaylists &&
                <ul onMouseEnter={() => setShowPlaylists(true)} className='playlist-dropdown'>
                    {Object.values(playlists).map((playlist, i) => (
                        <li key={i} onClick={() => handleAddToPlaylist(playlist.id)} className='playlist-dropdown-option'>
                            {playlist.name}
                        </li>
                    ))}

                </ul>
            }


      </div>
      )}
    </>
  );
}

export default SongOptionsModal
