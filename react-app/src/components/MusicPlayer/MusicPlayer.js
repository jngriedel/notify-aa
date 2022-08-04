import React from 'react'

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { useMusicContext } from '../context/MusicContext';


const MusicPlayer = () =>{
const {audioLists, clearAudioList} = useMusicContext()
return (
    <div>
    <ReactJkMusicPlayer
    audioLists={audioLists}
    theme='dark'
    toggleMode={false}
    mode='full'
    showDownload={false}
    defaultVolume={0.5}
    clearPriorAudioLists={clearAudioList}
    />

    </div>
)

}

export default MusicPlayer
