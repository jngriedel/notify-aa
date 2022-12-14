
import React, {useState, useEffect} from 'react';
import { NavLink, useHistory, useLocation} from 'react-router-dom';
import UploadSong from '../UploadSong/UploadSong';
import './NavBar.css'
import logo from '../../images/logo.png'
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylists } from '../../store/playlist';
import { getUserLikes } from '../../store/like';

const NavBar = () => {
  const [showUpload, setShowUpload] = useState(false)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const sessionUser = useSelector (state=> state.session.user)
  const userPlaylists = useSelector(state =>state.playlist)
  const history = useHistory()

  const dispatch = useDispatch()
  const path = useLocation()
  useEffect(() => {

    if (!sessionUser) history.push('/')
    dispatch(getPlaylists(sessionUser?.id))
    dispatch(getUserLikes())


  }, [dispatch]);

  // if (path.pathname !=='/home' && path.pathname !=='/profile' && !path.pathname.startsWith('/playlists') )history.push('/home')
  if (path.pathname ==='/' || path.pathname ==='/login' || path.pathname ==='/sign-up') return null

  return (

    <div className='navbar'>
      <NavLink className='logo-link' to='/home'>
        <img alt='logo' className='navbar-logo' src={logo}/>
      </NavLink>
      <ul className='navbar-list'>
        <li>
          <div className='empty'></div>
          <NavLink style={{color: path.pathname === '/home' ? 'white' : ''}} className='navbar-links' to='/home' exact={true} activeClassName='active'>

              <i  class="fa-solid fa-house fa-lg"></i> Home

          </NavLink>
        </li>

        {/* <li>
        <div className='empty'></div>
          <NavLink style={{color: path.pathname === '/profile' ? 'white' : ''}} className='navbar-links' to='/profile' exact={true} activeClassName='active'>
          <i class="fa-solid fa-user fa-lg"></i> Your Profile
          </NavLink>
        </li> */}
        <li>
        <div className='empty'></div>
          <NavLink style={{color: path.pathname === '/search' ? 'white' : ''}} className='navbar-links' to='/search' exact={true} activeClassName='active'>
              <i class="fa-solid fa-magnifying-glass fa-lg"></i> Search
          </NavLink>
        </li>
        <li id='profile-navlink'>
        <div className='empty'></div>
          <NavLink style={{color: path.pathname === '/profile' ? 'white' : ''}} className='navbar-links' to='/profile' exact={true} activeClassName='active'>
          <i class="fa-solid fa-user fa-lg"></i> Profile
          </NavLink>
        </li>
        <li>
        <div className='empty'></div>
          <div  className='navbar-links' onClick={()=>setShowUpload(true)}>
          <i class="fa-solid fa-cloud-arrow-up "></i>Upload Song
          </div>
        </li>
        <li>
        <div className='empty'></div>
          <div className='navbar-links' onClick={()=>setShowCreatePlaylist(true)} >
          <i class="fa-solid fa-plus fa-lg"></i> Create Playlist
          </div>
        </li>
        <li id='liked-navlink'>
        <div className='empty'></div>
          <NavLink style={{color: path.pathname === '/likes' ? 'white' : ''}} className='navbar-links' to='/likes' exact={true} activeClassName='active'>
          <i class="fa-solid fa-heart fa-lg"></i> Liked Songs
          </NavLink>
        </li>
      </ul>
        <UploadSong setShowUpload={setShowUpload} showUpload={showUpload} />
        <CreatePlaylist setShowCreatePlaylist={setShowCreatePlaylist} showCreatePlaylist={showCreatePlaylist} />
        <ul className='navbar-playlist-menu'>
        {userPlaylists && Object.values(userPlaylists).map((playlist, i)=>(
   <NavLink className='navbar-playlist-navlink' key={i} to={`/playlists/${playlist.id}`}>
        <li style={{color: path.pathname === `/playlists/${playlist.id}` ? 'white' : ''}} className='navbar-playlist-li'>{playlist.name}</li>
    </NavLink>
   ))}
        </ul>

      <div className='nav-footer-wrapper'>
        <div className='nav-footer'>
                    <span className="footer-message">By: Josef Niels Griedel</span>
                    <a className='footer-link' rel="noreferrer" target="_blank" href='https://www.linkedin.com/in/josef-niels-g-bbb2b38b/'><i className="fa-brands fa-linkedin"></i></a>
                    <a className='footer-link' rel="noreferrer" target="_blank" href='https://github.com/jngriedel'><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
    </div>
  );
}

export default NavBar;
