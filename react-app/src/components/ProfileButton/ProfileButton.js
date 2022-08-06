import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import no_profile from '../../images/no_profile.png'
import './ProfileButton.css'
import triangle from '../../images/triangle.png'
import triangle_upsidedown from '../../images/triangle_upsidedown.png'

import ProfileButtonDropDownModal from './ProfileButtonDropDownModal';
import { useSelector } from 'react-redux';



const ProfileButton = () => {
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector(state=> state.session.user)
    return (
      <>
      <div onClick={()=> setShowModal(true)} className='profile-button'>
        <img className='profile-button-picture' alt='profile' src={sessionUser.image_url? sessionUser.image_url: no_profile}/>
        <span>{sessionUser.username}</span>
        <img className='triangle' alt='decoration' src={showModal? triangle_upsidedown: triangle}/>

      </div>
      <ProfileButtonDropDownModal showModal={showModal} setShowModal={setShowModal} />
      </>
    );
  }

  export default ProfileButton;