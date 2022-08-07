import React, { useEffect } from 'react';
import { Modal } from '../../components/context/Modal';

import './SongOptionsModal.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getPlaylists} from '../../store/playlist'


function SongOptionsModal({showDropDown, setShowDropDown, handleEdit, handleDelete, song }) {
  const dispatch = useDispatch()
  const playlists = useSelector(state=>state.playlist)
  const sessionUser = useSelector(state=> state.session.user)
  useEffect(()=> {
    dispatch(getPlaylists(sessionUser.id))
  },[])

  return (
    <>
      {showDropDown && (
        <Modal onClose={() => setShowDropDown(false)}>

            <ul  className='songoptions-dropdown'>
                <li>Edit</li>
                <li style={{visibility: sessionUser.id === song.user_id? 'visible': 'hidden'}} onClick={handleDelete}>Delete</li>
                <li>Add to Playlist</li>
            </ul>


         </Modal>
      )}
    </>
  );
}

export default SongOptionsModal
