import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useMusicContext } from '../context/MusicContext';

import no_playlist from '../../images/no_playlist.PNG'
import playbuttonblack from '../../images/playbuttonblack.png'

import './SongPreview.css'

function SongPreview({song}) {
  const sessionUser = useSelector(state=> state.session.user)
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()

  const [showPlay, setShowPlay] = useState(false)


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

    <div
    onMouseEnter={() => setShowPlay(true)}
    onMouseLeave={() => setShowPlay(false)}
      onClick={doubleClick} className='song-preview'>
      <div className='image-and-play'>
      <img className='song-preview-image' src={song.image_url ? song.image_url : no_playlist } />
      {showPlay && <img onClick={handlePlay} className='play-button-preview'  alt='play' src={playbuttonblack} />}
      </div>
        <div className='preview-details'>
            <p className='song-preview-name'>{song.name}</p>
            <span className='song-preview-artist'>{song.artist}</span>
        </div>
      </div>

   </>
  );
}
export default SongPreview
