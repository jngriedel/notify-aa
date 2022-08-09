import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getSongs} from '../../store/song'
import { getPlaylists } from '../../store/playlist';
import Song from '../Song/Song'
import no_playlist from '../../images/no_playlist.PNG'
import no_profile_image from "../../images/no_profile_image.png"
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import './Home.css'

function Home() {
  const sessionUser = useSelector(state=> state.session.user)

  const [loaded, setLoaded] = useState(false)
  const [imgOverLay, setImgOverlay] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongs(sessionUser.id))
    dispatch(getPlaylists(sessionUser.id))

    .then((res)=>{setLoaded(true)})
  }, [dispatch]);



  return (
    <>
    {loaded &&
    <div>
        <h2>Welcome back {sessionUser.username}!</h2>

    <div className='playlist-carousel scrollable'>

   </div>

   </div>
}

   </>
  );
}
export default Home
