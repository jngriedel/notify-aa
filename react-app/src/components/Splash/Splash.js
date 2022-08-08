import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Splash.css'






function Splash(){


    return (
        <div className='splash-wrapper'>
            <div className='splash-header'>
                Header
            </div>
            <div className='splash-main'>
                <h1>Music for you.</h1>
            </div>
        </div>
    )
}

export default Splash
