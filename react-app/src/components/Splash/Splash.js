import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Splash.css'






function Splash(){


    return (
        <div className='splash-wrapper'>
            <div className='splash-header'>
                <img className='splash-logo' alt='logo' src={logo} />
                <div className='splash-links'>
                <NavLink className='splash-link' to='/sign-up'>Sign Up</NavLink>
                <NavLink className='splash-link' to='/login'>Log In</NavLink>
                </div>
            </div>
            <div className='splash-main'>
                <h1 className='splash-message'>Music for you.</h1>
                <div className='footer'>
                    <span className="footerMessage">Created by: Josef Niels Griedel</span>
                    <a className='footer-link' rel="noreferrer" target="_blank" href='https://www.linkedin.com/in/josef-niels-g-bbb2b38b/'><i className="fa-brands fa-linkedin"></i></a>
                    <a className='footer-link' rel="noreferrer" target="_blank" href='https://github.com/jngriedel'><i className="fa-brands fa-github"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Splash
