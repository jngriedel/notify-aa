import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import {deletePlaylist, editPlaylist, addPlaylist} from '../../store/playlist'
import no_playlist from "../../images/no_playlist.PNG"
import liked_songs from '../../images/liked_songs.png'
import play_button_black from "../../images/playbuttonblack.png"
import Song from '../Song/Song';
import EditPlaylistModal from '../EditPlaylistModal/EditPlaylistModal'
import './LikedSongs.css'
import {setSongs} from '../../store/song'
import { useMusicContext } from '../context/MusicContext';
import PlaylistOptionsDropDown from '../PlaylistOptionsDropdown/PlaylistOptionsDropdown';

function LikedSongs() {


  const playlist = useSelector(state => state.playlist[playlistId])
  const likes = useSelector(state => state.like)
  const sessionUser = useSelector(state => state.session.user)
  const {setClearAudioList, setAudioLists} = useMusicContext()

  const [edit, setEdit] = useState(false)
  const [showEditPlaylist, setShowEditPlaylist] = useState(false)
  const [name, setName] = useState("")
  const [imgOverLay, setImgOverlay] = useState(false)

  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState("")
  const [showAddToQueue, setShowAddToQueue] = useState(false)


  useEffect(() => {



    (async () => {

      setLoaded(true)



    })();
  }, []);










const playPlaylist = async() => {
    const audioListTemp = []

    await setClearAudioList(true)
    Object.values(songs).forEach((song)=>{
        audioListTemp.push({
            name: song.name,
            singer: song.artist,
            musicSrc: song.mp3_url,
            cover: song.image_url ? song.image_url : no_playlist
          })
    })


    await setAudioLists(audioListTemp)
}




  return (
    <>
    {!loaded && <div className='loading-screen'>
      <h2>Loading your Liked Songs!</h2>
      <div className='loader'></div>
      </div>}

    { loaded && <div>

     <div className='playlist-head'>
      <div
      className='profile-image-container'
      >
        <img className='playlist-main-image' src={liked_songs} />

      </div>
      <div className='playist-info'>
        <h4 className='playlist-word'>Playlist</h4> <h1 className='playlist-name'>Liked Songs </h1>
        <div className='playlist-description-head'></div>


      </div>


    </div>

    <div className='playlist-play-and-ellipse'>
      <button className='play-button-button' type='button' onClick={playPlaylist}><img className='play-button-image'  alt='play' src={play_button_black}/></button>
      <div style={{visibility: Object.values(likes).length > 0 ? 'visible' : 'hidden' }} className='playlist-elipse-holder'><i onClick={()=>{setShowAddToQueue(true);}} class="fa-solid fa-ellipsis fa-xl"></i></div>
      <PlaylistOptionsDropDown songs={likes} showAddToQueue={showAddToQueue} setShowAddToQueue={setShowAddToQueue} />
    </div>

        <div className='song-header'>
            <div>
              #
            </div>
            <div>
              TITLE
            </div>
            <div>
              ALBUM
            </div>
          </div>

        <div>

        {likes && Object.values(kujes).map((song, i)=>(
          <Song key={i} song={song}  i={i}  />
      ))}
          {Object.values(likes).length === 0 &&
            <div className='empty-playlist' >
              <h1>Looks empty in here!</h1>
              <h3>Add some songs using: <NavLink className='playlist-goto-search'  to="/search">Search</NavLink></h3></div>}




        </div>
        </div>
    }
    </>
  );
}
export default LikedSongs;
