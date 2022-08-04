
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeSongFromPlaylist, addPlaylist } from '../../store/playlist';

import { useMusicContext } from '../context/MusicContext';

import '../Song/Song.css'
function PlaylistSong({song, playlistId, playlist}) {
  const sessionUser = useSelector(state=> state.session.user)

  const [edit, setEdit] = useState(false)
  const [addToPlaylist, setAddToPlaylist] = useState(false)
  const dispatch = useDispatch()
  const {audioLists, setAudioLists} = useMusicContext()




  const handlePlay = async() => {
    const audioListTemp = []

    audioListTemp.push({
      name: song.name,
      singer: song.artist,
      musicSrc: song.mp3_url
    })

    await setAudioLists(audioListTemp)

  }





  const handleAddToPlaylist = async (playlistId) => {
    const response = await fetch(`/api/playlistjoin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        playlist_id : playlistId,
        song_id : song.id
      }),

    });

    const data = await response.json()

    setAddToPlaylist(false)

  }
  const handleRemoveFromPlaylist = async () => {
    const response = await fetch(`/api/playlistjoin/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          playlist_id : playlistId,
          song_id : song.id
        }),
    })



    const data = await response.json()
    if (response.ok) {
        // console.log(data.message)
        dispatch(removeSongFromPlaylist(song.id, playlistId))
        dispatch(addPlaylist(playlist))
    }



  }

  return (
    <>
    {!edit &&
    <div className='song-container'>
        <p>{song.name}</p>
        <p>{song.artist}</p>
        <p>{song.album}</p>
        <p>{song.genre}</p>

        <button onClick={handlePlay} type='button' >PLAY</button>
        { !addToPlaylist && <button onClick={()=>{setAddToPlaylist(true)}} type='button' >Add to Playlist</button>}
        {addToPlaylist &&
        <div className='playlist-dropdown'>
        {sessionUser.playlists.map((playlist,i)=>(
            <div key={i} onClick={()=>handleAddToPlaylist(playlist.id)} className='playlist-dropdown-option'>
              {playlist.name}
            </div>
        ))}
        <button onClick={()=>setAddToPlaylist(false)} type='button'>Cancel</button>
          </div>
        }
        <button type='button' onClick={handleRemoveFromPlaylist} >Remove From Playlist</button>

    </div>
    }


   </>
  );
}
export default PlaylistSong
