import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import {deletePlaylist, editPlaylist, addPlaylist} from '../../store/playlist'
import no_playlist from "../../images/no_playlist.PNG"
import play_button_black from "../../images/playbuttonblack.png"
import Song from '../Song/Song';
import EditPlaylistModal from '../EditPlaylistModal/EditPlaylistModal'
import './Playlist.css'
import {setSongs} from '../../store/song'
import { useMusicContext } from '../context/MusicContext';

function Playlist() {

  const { playlistId }  = useParams();
  const playlist = useSelector(state => state.playlist[playlistId])
  const songs = useSelector(state => state.song)
  const sessionUser = useSelector(state => state.session.user)
  const {setClearAudioList, setAudioLists} = useMusicContext()
  const [errors, setErrors] = useState([])
  const [edit, setEdit] = useState(false)
  const [showEditPlaylist, setShowEditPlaylist] = useState(false)
  const [name, setName] = useState("")
  const [imgOverLay, setImgOverlay] = useState(false)
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()



  useEffect(() => {

    if (!playlistId || isNaN(+playlistId) ) {
      history.push("/home");
    }


    (async () => {
      const response = await fetch(`/api/playlists/${playlistId}`);
      const data = await response.json();
      if (!data.playlist) history.push('/home');
      else{
      await dispatch(addPlaylist(data.playlist))
      await dispatch(setSongs(Object.values(data.playlist.songs)))
      setLoaded(true)
      }


    })();
  }, [playlistId]);






  useEffect(()=>{
    setName(playlist?.name)
    setDescription(playlist?.description)

  },[playlist])



const playPlaylist = async() => {
    const audioListTemp = []
    setClearAudioList(true)
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

    { loaded && <div>
   { playlist && !edit &&
     <div className='playlist-head'>
      <div
      className='profile-image-container'
      onMouseEnter={() => setImgOverlay(true)}
      onMouseLeave={() => setImgOverlay(false)}>
        <img className='playlist-main-image' src={playlist.image_url ? playlist.image_url : no_playlist } />
        { imgOverLay && <div style={{visibility: sessionUser.id === playlist.user_id ? 'visible': 'hidden'}} onClick={()=>{setShowEditPlaylist(true); setImgOverlay(false)}} className='edit-playlist-overlay'  > <i class="fa-solid fa-pencil"></i> Edit   </div>}
      </div>
      <div className='playist-info'>
        <h4 className='playlist-word'>Playlist</h4> <h1 className='playlist-name'>{playlist.name} </h1>
        <div className='playlist-description-head'>{playlist.description}</div>


      </div>


    </div> }
    <button className='play-button-button' type='button' onClick={playPlaylist}><img className='play-button-image'  alt='play' src={play_button_black}/></button>

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

        {songs && Object.values(songs).map((song, i)=>(
          <Song key={i} song={song} playlistId={playlistId} i={i}  />
      ))}
          {Object.values(songs).length === 0 &&
            <div className='empty-playlist' >
              <h1>Looks empty in here!</h1>
              <h3>Add some songs using: <NavLink className='playlist-goto-search'  to="/search">Search</NavLink></h3></div>}




        </div>
        </div> }
        <EditPlaylistModal playlist={playlist} setShowEditPlaylist={setShowEditPlaylist} showEditPlaylist={showEditPlaylist} />
    </>
  );
}
export default Playlist;
