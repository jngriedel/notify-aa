
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import UploadSong from '../UploadSong/UploadSong';
import './NavBar.css'
import logo from '../../images/logo.png'

const NavBar = () => {
  const [showUpload, setShowUpload] = useState(false)
  return (
    <div className='navbar'>
      <img alt='logo' className='navbar-logo' src={logo}/>
      <ul className='navbar-list'>
        <li>
          <NavLink className='navbar-links' to='/' exact={true} activeClassName='active'>

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
          <NavLink className='navbar-links' to='/createplaylist' exact={true} activeClassName='active'>
          <i class="fa-solid fa-plus fa-lg"></i> Create Playlist
          </NavLink>
        </li>



      </ul>
        <UploadSong setShowUpload={setShowUpload} showUpload={showUpload} />
    </div>
  );
}

export default NavBar;
