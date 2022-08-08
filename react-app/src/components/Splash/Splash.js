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
            </div>
        </div>
    )
}

export default Splash
