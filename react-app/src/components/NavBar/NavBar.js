
import React, {useState, useEffect} from 'react';
import { NavLink, useHistory, useLocation} from 'react-router-dom';
import UploadSong from '../UploadSong/UploadSong';
import './NavBar.css'
import logo from '../../images/logo.png'
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylists } from '../../store/playlist';

const NavBar = () => {
  const [showUpload, setShowUpload] = useState(false)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const sessionUser = useSelector (state=> state.session.user)

  const dispatch = useDispatch()
  const path = useLocation()
  useEffect(() => {

    // dispatch(getPlaylists(sessionUser.id))

  }, [dispatch]);

  if (path.pathname ==='/' || path.pathname ==='/login' || path.pathname ==='/sign-up') return null

  return (

    <div className='navbar'>
      <img alt='logo' className='navbar-logo' src={logo}/>
      <ul className='navbar-list'>
        <li>
          <NavLink className='navbar-links' to='/home' exact={true} activeClassName='active'>

              <i class="fa-solid fa-house fa-lg"></i> Home

          </NavLink>
        </li>

        <li>
          <div className='navbar-links' onClick={()=>setShowUpload(true)}>
          <i class="fa-solid fa-cloud-arrow-up fa-lg"></i>Upload Song
          </div>
        </li>
        <li>
          <NavLink className='navbar-links' to='/profile' exact={true} activeClassName='active'>
          <i class="fa-solid fa-user fa-lg"></i> Your Profile
          </NavLink>
        </li>
        <li>
          <div className='navbar-links' onClick={()=>setShowCreatePlaylist(true)} >
          <i class="fa-solid fa-plus fa-lg"></i> Create Playlist
          </div>
        </li>
      </ul>
        <UploadSong setShowUpload={setShowUpload} showUpload={showUpload} />
        <CreatePlaylist setShowCreatePlaylist={setShowCreatePlaylist} showCreatePlaylist={showCreatePlaylist} />
        <ul>
          {}
        </ul>


        <div className='nav-footer'>
                    <span className="footer-message">By: Josef Niels Griedel</span>
                    <a className='footer-link' rel="noreferrer" target="_blank" href='https://www.linkedin.com/in/josef-niels-g-bbb2b38b/'><i className="fa-brands fa-linkedin"></i></a>
                    <a className='footer-link' rel="noreferrer" target="_blank" href='https://github.com/jngriedel'><i className="fa-brands fa-github"></i></a>
                </div>
    </div>
  );
}

export default NavBar;
