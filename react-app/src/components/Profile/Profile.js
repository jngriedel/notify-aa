import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {getSongs} from '../../store/song'
import { getPlaylists } from '../../store/playlist';
import Song from '../Song/Song'
import no_playlist from '../../images/no_playlist.PNG'
import no_profile_image from "../../images/no_profile_image.png"
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import profile_picture_uncropped2 from '../../images/profile_picture_uncropped2.jpg'
import './Profile.css'

function User() {
  const sessionUser = useSelector(state=> state.session.user)
  const userSongs = useSelector(state=> state.song)
  const userPlaylists = useSelector(state => state.playlist )
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
    {!loaded && <div className='loading-screen'>
      <h2>Loading your Profile!</h2>
      <div className='loader'></div>
      </div>}
    {loaded &&
    <div>
    <div className='playlist-head'>
      <div
      onMouseEnter={() => setImgOverlay(true)}
      onMouseLeave={() => setImgOverlay(false)}
      onClick={()=>{setShowEditProfile(true); setImgOverlay(false)}}
       className='profile-image-container'>
        <img
        alt='profile'

         className='profile-main-image' src={sessionUser.image_url ? sessionUser.image_url : profile_picture_uncropped2 } />
         { imgOverLay && <div className='edit-image-overlay'  > <i class="fa-solid fa-pencil"></i> Choose Photo   </div>}
      </div>
      <div className='playist-info'>
        <h2 className='playlist-word'>Profile</h2> <h1 className='playlist-name'>{sessionUser.username} </h1>
      </div>
    </div>
    <h2>Your Playlists</h2>
    <div className='playlist-carousel scrollable'>
    {userPlaylists && Object.values(userPlaylists).map((playlist, i)=>(
   <NavLink className='playlist-navlink' key={i} to={`/playlists/${playlist.id}`}>
    <div className='playlist-preview'>
      <img className='playlist-preview-image' src={playlist.image_url ? playlist.image_url : no_playlist } />
      <div className='preview-details'>
        <p className='playlist-preview-name'>{playlist.name}</p>
      </div>
      </div>
    </NavLink>
   ))}

   </div>
   <h2>Your Songs</h2>
    <div className='song-header'>
      <div>
        #
      </div>
      <div>
        TITLE
      </div>
      <div>
        ALBUM
      </div>
    </div>
   {userSongs && Object.values(userSongs).map((song, i)=>(
    <Song key={i} i={i} song={song} />
   ))}
   </div>
}
 <EditProfileModal showEditProfile={showEditProfile} setShowEditProfile={setShowEditProfile} />
   </>
  );
}
export default User;
