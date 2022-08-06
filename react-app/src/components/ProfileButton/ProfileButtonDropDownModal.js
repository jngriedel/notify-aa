import React from 'react';
import { Modal } from '../../components/context/Modal';
import './ProfileButton.css'
import LogoutButton from '../auth/LogoutButton';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

function ProfileButtonDropDownModal({showModal, setShowModal, }) {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            <ul className='profile-dropdown'>
                <NavLink className='profile-dropdown-link' to='/profile'><li>Profile</li></NavLink>
                <li onClick={onLogout}>  Logout</li>
            </ul>


        </Modal>
      )}
    </>
  );
}

export default ProfileButtonDropDownModal
