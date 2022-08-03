import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {deletePlaylist} from '../../store/playlist'


function Playlist() {
  const [playlist, setPlaylist] = useState('')
  const [errors, setErrors] = useState([])
  const { playlistId }  = useParams();
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/playlists/${playlistId}`);
      const data = await response.json();
      await setPlaylist(data.playlist);

    })();
  }, [playlistId]);

  const handleDelete = async() => {
    const res = await dispatch(deletePlaylist(playlistId))

  
    if (res.playlistId){
        history.push('/profile')
    }
    else{
        setErrors(res)

    }
  }


  return (
    <>

   { playlist &&
     <ul>
      <li>
        <strong>Playlist</strong> {playlist.name}
      </li>
      <li>
        <button type='button' onClick={handleDelete}>Delete</button>
      </li>

    </ul> }
    </>
  );
}
export default Playlist;
