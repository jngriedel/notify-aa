import React from 'react'

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { useMusicContext } from '../context/MusicContext';
import './MusicPlayer.css'


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
    showThemeSwitch={false}
    glassBg={false}
    className={'music-player'}

    />

    </div>
)

}

export default MusicPlayer
