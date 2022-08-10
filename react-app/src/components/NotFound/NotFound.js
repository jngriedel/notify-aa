import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png'
import './NotFound.css'





function NotFound(){


    return (
        <div className='notfound-main'>
            <h1>404 Not Found</h1>
            <h3>You're not supposed to be here!</h3>
            <NavLink  className='go-home-button' to='/home' exact={true} activeClassName='active'>

              <i  class="fa-solid fa-house fa-lg"></i>        Go Home

          </NavLink>
        </div>
    )
}

export default NotFound
