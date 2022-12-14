import React, { useState  } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useMusicContext } from '../context/MusicContext';

import SongOptionsModal from '../SongOptionsModal/SongOptionsModal';
import no_playlist from '../../images/no_playlist.PNG'
import playbuttonblack from '../../images/playbuttonblack.png'
import { newLike } from '../../store/like';

import './SongPreview.css'

function SongPreview({song, i}) {
  const sessionUser = useSelector(state=> state.session.user)
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()
  const likes = useSelector(state =>  state.like)
  const [showPlay, setShowPlay] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const dispatch = useDispatch()
  
  const handlePlay = async() => {
    await setClearAudioList(true)

    const audioListTemp = []
    audioLists.forEach(element => {
      if (song.name === element.name) {alert("Already in Queue!"); return}

    });
    audioListTemp.push({
      name: song.name,
      singer: song.artist,
      musicSrc: song.mp3_url,
      cover: song.image_url ? song.image_url : no_playlist
    })

    await setAudioLists(audioListTemp)

  }

  const handleLike = async()=> {
    await dispatch(newLike(song.id))
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
      onClick={doubleClick}
      className='song-preview'>
      <div className='image-and-play'>
      <img className='song-preview-image' src={song.image_url ? song.image_url : no_playlist } />
      {showPlay && <img onClick={handlePlay} className='play-button-preview'  alt='play' src={playbuttonblack} />}
      </div>
        <div className='preview-details'>
            <div className='name-and-elipse'>
                <span className='song-spanreview-name'>{song.name}</span>
                <div style={{visibility: showPlay? 'visible' : 'hidden'}}className='preview-elipse'><i onClick={()=>{setShowDropDown(true); }} class="fa-solid fa-ellipsis fa-lg"></i></div>
                <SongOptionsModal song={song} showDropDown={showDropDown} setShowDropDown={setShowDropDown} i={i} />
            </div>
            <div className='preview-like-and-artist'>
              <span className='song-preview-artist'>{song.artist}</span>
              { likes[song.id] ? <button className='song-liked' type='button' onClick={handleLike}><i class="fa-solid fa-heart fa-lg"></i></button>
                : <button className='song-unliked' type='button' onClick={handleLike}><i class="fa-regular fa-heart fa-lg"></i></button> }
            </div>
        </div>
      </div>



   </>
  );
}
export default SongPreview
