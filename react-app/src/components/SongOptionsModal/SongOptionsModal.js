import React from 'react';
import { Modal } from '../../components/context/Modal';


import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function SongOptionsModal({showModal, setShowModal, }) {
  const dispatch = useDispatch()

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            <ul className='songoptions-dropdown'>
                <NavLink className='profile-dropdown-link' to='/profile'><li>Profile</li></NavLink>
                <li onClick={onLogout}>  Logout</li>
            </ul>


        </Modal>
      )}
    </>
  );
}

export default SongOptionsModal
