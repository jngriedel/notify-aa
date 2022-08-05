
import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeSong } from '../../store/song';
import no_playlist from "../../images/no_playlist.PNG"
import { useMusicContext } from '../context/MusicContext';

import '../Song/Song.css'
function PlaylistSong({song, playlistId, i}) {
  const sessionUser = useSelector(state=> state.session.user)

  const [edit, setEdit] = useState(false)
  const [addToPlaylist, setAddToPlaylist] = useState(false)
  const dispatch = useDispatch()
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()




  const handlePlay = async() => {
    const audioListTemp = []
    setClearAudioList(true)

    audioListTemp.push({
      name: song.name,
      singer: song.artist,
      musicSrc: song.mp3_url,
      cover: song.image_url ? song.image_url : no_playlist
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

        dispatch(removeSong(song.id))

    }



  }

  return (
    <>
    {!edit &&
    <div className='song-container'>
        <p>{i + 1}</p>
        <div className='song-title'>
        <img className='song-image' src={song.image_url? song.image_url : no_playlist} />
          <div className='song-name-artist'>
          <p>{song.name}</p>
          <p>{song.artist}</p>
         </div>
        </div>
        <p>{song.album}</p>

        <div className='song-buttons'>
        <button onClick={handlePlay} type='button' >PLAY</button>
        { !addToPlaylist && <button onClick={()=>{setAddToPlaylist(true)}} type='button' >Add to Playlist</button>}
        <button type='button' onClick={handleRemoveFromPlaylist} >Remove From Playlist</button>
        </div>
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

    </div>
    }


   </>
  );
}
export default PlaylistSong
