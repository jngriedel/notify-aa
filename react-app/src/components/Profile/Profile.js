import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {getSongs} from '../../store/song'
import { getPlaylists } from '../../store/playlist';
import Song from '../Song/Song'
import no_playlist from "../../images/no_playlist.PNG"
import './Profile.css'

function User() {
  const sessionUser = useSelector(state=> state.session.user)
  const userSongs = useSelector(state=> state.song)
  const userPlaylists = useSelector(state => state.playlist )
  const [loaded, setLoaded] = useState(false)
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
   <h1>Profile Page</h1>
    <div className='playlist-carousel scrollable'>
   {userPlaylists && Object.values(userPlaylists).map((playlist, i)=>(
   <NavLink className='playlist-navlink' key={i} to={`/playlists/${playlist.id}`}>
    <div className='playlist-preview'>
      <img className='playlist-preview-image' src={playlist.image_url ? playlist.image_url : no_playlist } />
      <p className='playlist-name'>{playlist.name}</p>
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
