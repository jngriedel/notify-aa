import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {getSongs} from '../../store/song'
import { getPlaylists } from '../../store/playlist';
import Song from '../Song/Song'
import no_playlist from '../../images/no_playlist.PNG'
import no_profile_image from "../../images/no_profile_image.png"
import './Profile.css'

function User() {
  const sessionUser = useSelector(state=> state.session.user)
  const userSongs = useSelector(state=> state.song)
  const userPlaylists = useSelector(state => state.playlist )
  const [loaded, setLoaded] = useState(false)
  const [imgOverLay, setImgOverlay] = useState(false)
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
    <div className='playlist-head'>
      <div
      onMouseEnter={() => setImgOverlay(true)}
      onMouseLeave={() => setImgOverlay(false)}
       className='profile-image-container'>
        <img
        alt='profile'

         className='profile-main-image' src={sessionUser.image_url ? sessionUser.image_url : no_profile_image } />
         { imgOverLay && <div className='edit-image-overlay'  > <i class="fa-solid fa-pencil"></i> Choose Photo   </div>}
      </div>
      <div className='playist-info'>
        <h2 className='playlist-word'>Profile</h2> <h1 className='playlist-name'>{sessionUser.username} </h1>
      </div>
      </div>
    <div className='playlist-carousel scrollable'>
   {userPlaylists && Object.values(userPlaylists).map((playlist, i)=>(
   <NavLink className='playlist-navlink' key={i} to={`/playlists/${playlist.id}`}>
    <div className='playlist-preview'>
      <img className='playlist-preview-image' src={playlist.image_url ? playlist.image_url : no_playlist } />
      <p className='playlist-preview-name'>{playlist.name}</p>
      </div>
    </NavLink>
   )) }
   </div>
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
   </>
  );
}
export default User;
