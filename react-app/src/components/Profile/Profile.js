import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSongs} from '../../store/song'
import Song from '../Song/Song'

function User() {
  const sessionUser = useSelector(state=> state.session.user)
  const userSongs = useSelector(state=> state.song)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongs(sessionUser.id))
  }, [dispatch]);



  return (
    <>
   <h1>Profile Page</h1>
   {userSongs && Object.values(userSongs).map((song, i)=>(
    <Song key={i} song={song} />
   ))}
   </>
  );
}
export default User;
