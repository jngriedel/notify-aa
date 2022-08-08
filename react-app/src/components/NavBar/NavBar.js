
import React, {useState} from 'react';
import { NavLink, useHistory, useLocation} from 'react-router-dom';
import UploadSong from '../UploadSong/UploadSong';
import './NavBar.css'
import logo from '../../images/logo.png'
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [showUpload, setShowUpload] = useState(false)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const sessionUser = useSelector (state=> state.session.user)
  const path = useLocation()


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
    </div>
  );
}

export default NavBar;
