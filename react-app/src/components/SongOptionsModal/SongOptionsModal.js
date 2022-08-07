import React from 'react';
import { Modal } from '../../components/context/Modal';


import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function SongOptionsModal({showModal, setShowModal, handleEdit, handleDelete }) {
  const dispatch = useDispatch()

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            <ul className='songoptions-dropdown'>
                <li>Edit</li>
                <li>Delete</li>
                <li>Add to Playlist</li>
                <li onClick={onLogout}>  Logout</li>
            </ul>


        </Modal>
      )}
    </>
  );
}

export default SongOptionsModal
