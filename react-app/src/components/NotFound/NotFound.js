import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png'
import './NotFound.css'





function NotFound(){
// const history = useHistory()

// const path = useLocation()
// if (path.pathname !== '/home') history.push('/home')

    return (
        <h1>404 Not Found</h1>
    )
}

export default NotFound
