import React, { useEffect, useState, useRef } from 'react';
import no_playlist from "../../images/no_playlist.PNG"
import './PlaylistOptionsDropdown.css'
import { useMusicContext } from '../context/MusicContext';

function PlaylistOptionsDropDown({showAddToQueue, setShowAddToQueue, songs}) {
  const {audioLists, setAudioLists, setClearAudioList} = useMusicContext()

  const ref = useRef()

  useEffect(() => {
    const outsideClick = e => {
      // Close if clicked on other element
      if (showAddToQueue && ref.current && !ref.current.contains(e.target)) {
           setShowAddToQueue(false)
      }
    }
      document.addEventListener("mousedown", outsideClick)
    return () => {
     // Cleanup return function
        document.removeEventListener("mousedown", outsideClick)
    }
  }, [showAddToQueue])



  const addPlaylistToQueue = async() => {
    const audioListTemp = []
    setClearAudioList(false)

    Object.values(songs).forEach((song)=>{
        setClearAudioList(false)
        audioListTemp.push({
            name: song.name,
            singer: song.artist,
            musicSrc: song.mp3_url,
            cover: song.image_url ? song.image_url : no_playlist
          })
    })


    await setAudioLists(audioListTemp)
}




  // normal options
  return (
    <>
      {showAddToQueue && (
        <div className='playlist-options-modal-wrapper' ref={ref}>


            <ul  className='songoptions-dropdown'>
                <li
                onClick={()=>{addPlaylistToQueue(); setShowAddToQueue(false);}}
                >
                    Add to Queue </li>

            </ul>

      </div>
      )}
    </>
  );
}

export default PlaylistOptionsDropDown
