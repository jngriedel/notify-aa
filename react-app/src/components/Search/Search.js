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


    <h2>Find New Music</h2>
    <div className='searchbar-main'>
        <div className='mag-holder'>
         <i class="fa-solid fa-magnifying-glass fa-lg"></i>
        </div>
        <input
        className='searchbar'
        value={search}
        placeholder="Artists, songs, or albums"
        onChange={(e)=>setSearch(e.target.value)}
        ></input>
         <div className='clear-holder'>
         { search.length > 0 && <i onClick={()=>setSearch("")} class="fa-solid fa-x fa-lg"></i> }
        </div>
    </div>

    { search.length > 0 && <div className='results'>
            {Object.values(allSongs)
            .filter((song) => {
                return song.name.match(new RegExp(search, "i")) || song.artist.match(new RegExp(search, "i")) ;
              })
            .map((song, i)=>(
                <SongPreview song={song} />
               ))  }
            {Object.values(allSongs)
            .filter((song) => {
                return song.name.match(new RegExp(search, "i")) || song.artist.match(new RegExp(search, "i")) ;
              }).length === 0 && <div className='empty-search'><h2>No results found for "{search}"</h2> <h4>Please make sure your words are spelled correctly or use less or different keywords.</h4></div>}



    </div>}








   </div>
}

   </>
  );
}
export default Search
