import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getAllSongs} from '../../store/song'
import { getPlaylists } from '../../store/playlist';
import SongPreview from '../SongPreview/SongPreview';
import Song from '../Song/Song'
import no_playlist from '../../images/no_playlist.PNG'

import './Home.css'

function Home() {
  const sessionUser = useSelector(state=> state.session.user)

  const [loaded, setLoaded] = useState(false)


  const dispatch = useDispatch()
  const userPlaylists = useSelector(state => state.playlist )
  const allSongs = useSelector(state => state.song)

  useEffect(() => {
    dispatch(getAllSongs())
    dispatch(getPlaylists(sessionUser.id))

    .then((res)=>{setLoaded(true)})
  }, [dispatch]);






  return (
    <>
    {loaded &&
    <div>
        <h2>Welcome back {sessionUser.username}!</h2>

    <h2>Jump Back In</h2>
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


    <h1>Explore...</h1>

    <h2>Pop</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Pop').map((song, i)=>(
    <SongPreview song={song} />
   ))}
    </div>





   </div>
}

   </>
  );
}
export default Home
