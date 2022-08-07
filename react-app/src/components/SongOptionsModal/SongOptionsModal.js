import React, { useEffect, useState } from 'react';
import { Modal } from '../../components/context/Modal';
import triangle_right from '../../images/triangle_right.png'
import { removeSong } from '../../store/song';
import './SongOptionsModal.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getPlaylists} from '../../store/playlist'


function SongOptionsModal({showDropDown, setShowDropDown, setEdit, handleDelete, song, playlistId}) {
  const dispatch = useDispatch()
  const playlists = useSelector(state=>state.playlist)
  const [showPlaylists, setShowPlaylists] = useState(false)
  const sessionUser = useSelector(state=> state.session.user)
  useEffect(()=> {
    dispatch(getPlaylists(sessionUser.id))
  },[])


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

  return (
    <>
      {showDropDown && (
        <Modal
        onClose={() =>{ setShowDropDown(false); setShowPlaylists(false) }}>

            <ul  className='songoptions-dropdown'>
                <li onClick={()=>setEdit(true)}>Edit</li>
                <li style={{visibility: sessionUser.id === song.user_id? 'visible': 'hidden'}} onClick={handleDelete}>Delete</li>
                {playlistId && <li  onClick={handleRemoveFromPlaylist} >Remove from this playlist</li> }
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


         </Modal>
      )}
    </>
  );
}

export default SongOptionsModal
