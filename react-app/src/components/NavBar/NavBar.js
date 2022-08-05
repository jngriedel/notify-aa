
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import logo from '../../images/logo.png'

const NavBar = () => {
  return (
    <div className='navbar'>
      <img alt='logo' className='navbar-logo' src={logo}/>
      <ul className='navbar-list'>
        <li>
          <NavLink className='navbar-links' to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink className='navbar-links' to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className='navbar-links' to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}

        <li>
          <NavLink className='navbar-links' to='/uploadsong' exact={true} activeClassName='active'>
            Upload Song
          </NavLink>
        </li>
        <li>
          <NavLink className='navbar-links' to='/profile' exact={true} activeClassName='active'>
            Your Library
          </NavLink>
        </li>
        <li>
          <NavLink className='navbar-links' to='/createplaylist' exact={true} activeClassName='active'>
            Create Playlist
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}

export default NavBar;