import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMusicContext } from '../context/MusicContext';

import no_playlist from '../../images/no_playlist.PNG'

import './SongPreview.css'

function SongPreview({song}) {
  const sessionUser = useSelector(state=> state.session.user)
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()

  const dispatch = useDispatch()
  const userPlaylists = useSelector(state => state.playlist )
  const allSongs = useSelector(state => state.song)



  const handlePlay = async() => {
    setClearAudioList(true)

    const audioListTemp = []

    audioListTemp.push({
      name: song.name,
      singer: song.artist,
      musicSrc: song.mp3_url,
      cover: song.image_url ? song.image_url : no_playlist
    })

    await setAudioLists(audioListTemp)

  }

  const doubleClick = event => {
    if (event.detail === 2){
      handlePlay()
    }
  }


  return (
    <>

    <div  onClick={doubleClick} className='song-preview'>
      <img className='song-preview-image' src={song.image_url ? song.image_url : no_playlist } />

        <div className='preview-details'>
            <p className='song-preview-name'>{song.name}</p>
            <span className='song-preview-artist'>{song.artist}</span>
        </div>
      </div>

   </>
  );
}
export default SongPreview
