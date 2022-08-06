import React from 'react';
import { Modal } from '../../components/context/Modal';
import './ProfileButton.css'
import LogoutButton from '../auth/LogoutButton';
import { NavLink } from 'react-router-dom';

function ProfileButtonDropDownModal({showModal, setShowModal, }) {



  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            <ul className='profile-dropdown'>
                <li><NavLink className='profile-dropdown-link' to='/profile'>Profile</NavLink></li>
                <li>  <LogoutButton /></li>
            </ul>


        </Modal>
      )}
    </>
  );
}

export default ProfileButtonDropDownModal
