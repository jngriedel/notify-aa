import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import no_profile_image_white from '../../images/no_profile_image_white.png'
import './ProfileButton.css'
import triangle from '../../images/triangle.png'
import triangle_upsidedown from '../../images/triangle_upsidedown.png'

import ProfileButtonDropDownModal from './ProfileButtonDropDownModal';
import { useSelector } from 'react-redux';



const ProfileButton = () => {
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector(state=> state.session.user)
    const path = useLocation()

    if (path.pathname ==='/' || path.pathname ==='/login' || path.pathname ==='/sign-up') return null

    return (
      <>
      <div onClick={()=> setShowModal(oldState => !oldState)} className='profile-button'>
        <img className='profile-button-picture' alt='profile' src={sessionUser?.image_url? sessionUser.image_url: no_profile_image_white}/>
        <span className='user-span'>{sessionUser?.username}</span>
        <img className='triangle' alt='decoration' src={showModal? triangle_upsidedown: triangle}/>

      </div>
      <ProfileButtonDropDownModal showModal={showModal} setShowModal={setShowModal} />
      </>
    );
  }

  export default ProfileButton;
