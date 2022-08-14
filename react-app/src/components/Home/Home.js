import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {getAllSongs} from '../../store/song'
import { getPlaylists } from '../../store/playlist';
import SongPreview from '../SongPreview/SongPreview';
import Song from '../Song/Song'
import no_playlist from '../../images/no_playlist.PNG'
import loading_page from '../../images/loading_page.gif'

import './Home.css'

function Home() {
  const sessionUser = useSelector(state=> state.session.user)

  const [loaded, setLoaded] = useState(false)
  const history = useHistory()

  const dispatch = useDispatch()
  const userPlaylists = useSelector(state => state.playlist )
  const allSongs = useSelector(state => state.song)

  useEffect(() => {
    dispatch(getAllSongs())
    dispatch(getPlaylists(sessionUser.id))

    .then((res)=>{setLoaded(true)})
  }, [dispatch]);

  const path = useLocation()
  if (path.pathname !== '/home') history.push('/home')




  return (
    <>
    {/* {!loaded && <img className='loading-image' alt='loading' src={loading_page} />} */}
    {loaded &&
    <div>
        <h1>Welcome back {sessionUser.username}!</h1>

    {Object.values(userPlaylists).length > 0 && <h2>Jump Back In</h2>}
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
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Rock</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Rock').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Electronic</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Electronic').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Rap</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Rap').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Jazz</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Jazz').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Metal</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Metal').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Country</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Country').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Classical</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Classical').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>

    <h2>Other</h2>
    <div className='playlist-carousel scrollable'>
    {allSongs && Object.values(allSongs).filter((song)=>  song.genre === 'Other').map((song, i)=>(
    <SongPreview song={song} i={i} />
   ))}
    </div>





   </div>
}

   </>
  );
}
export default Home
