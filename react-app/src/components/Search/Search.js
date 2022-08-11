import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {getAllSongs} from '../../store/song'
import { getPlaylists } from '../../store/playlist';
import SongPreview from '../SongPreview/SongPreview';
import Song from '../Song/Song'
import no_playlist from '../../images/no_playlist.PNG'
import loading_page from '../../images/loading_page.gif'

import './Search.css'

function Search() {
  const sessionUser = useSelector(state=> state.session.user)

  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState('')
  const history = useHistory()

  const dispatch = useDispatch()
  const userPlaylists = useSelector(state => state.playlist )
  const allSongs = useSelector(state => state.song)

  useEffect(() => {
    dispatch(getAllSongs())


    .then((res)=>{setLoaded(true)})
  }, [dispatch]);

  const path = useLocation()
  if (path.pathname !== '/search') history.push('/home')




  return (
    <>

    {loaded &&
    <div className='search-main'>


    <h2>Find New Songs</h2>

    <input
    className='searchbar'
    value={search}
    placeholder="Artists, songs, or albums"
    onChange={(e)=>setSearch(e.target.value)}
    ></input>








   </div>
}

   </>
  );
}
export default Search
