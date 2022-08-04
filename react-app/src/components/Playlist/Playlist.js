import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {deletePlaylist, editPlaylist, addPlaylist} from '../../store/playlist'
import no_playlist from "../../images/no_playlist.PNG"
import Song from '../Song/Song'

function Playlist() {
//   const [playlist, setPlaylist] = useState('')
  const { playlistId }  = useParams();
  const playlist = useSelector(state => state.playlist[playlistId])
  const songs = useSelector(state => state.playlist[playlistId].songs)

  const [errors, setErrors] = useState([])
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/playlists/${playlistId}`);
      const data = await response.json();

      await dispatch(addPlaylist(data.playlist))


    })();
  }, [playlistId]);

  useEffect(()=>{
    setName(playlist?.name)
    setDescription(playlist?.description)

  },[playlist])


  const handleDelete = async() => {
    const res = await dispatch(deletePlaylist(playlistId))


    if (res.playlistId){
        history.push('/profile')
    }
    else{
        setErrors(res)

    }
  }

  const handleCancelEdit = () =>{
    setDescription(playlist.description)
    setName(playlist.name)
    setImage(null)

    setEdit(false)
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    setErrors([])
    const form = new FormData();
    form.append("image", image);
    form.append('name', name);
    form.append('description', description);


    const response = await dispatch(editPlaylist(playlistId, form))

    if (response.playlist) {
      await dispatch(addPlaylist(response.playlist))
      setEdit(false)

      return
    }
    else {
      setErrors(response)
    }
}
const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
}




  return (
    <>

   { playlist && !edit &&
     <div>
      <div>
        <strong>Playlist</strong> {playlist.name}
        <strong>Description:</strong> {playlist.description}
        <img className='playlist-preview-image' src={playlist.image_url ? playlist.image_url : no_playlist } />
      </div>
      <div>
        <button type='button' onClick={(()=>setEdit(true))}>Edit</button>
        <button type='button' onClick={handleDelete}>Delete</button>
      </div>

    </div> }
    {edit && <div className='playlist-container'>
    {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
    <form

        onSubmit={handleEdit}>

            <label>Name</label>
            <input

                  required
                  type="text"
                  name="playlist name"
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Description</label>
            <input

                  type="text"
                  name="description"
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                ></input>
            <label>Change Picture (Optional) </label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />





        <button type='submit'>Save</button>
        <button type='button' onClick={handleCancelEdit}>Cancel</button>

        </form>

        </div>}


        <div>
        {songs && Object.values(songs).map((song, i)=>(
    <Song key={i} song={song} />
   ))}



        </div>

    </>
  );
}
export default Playlist;
