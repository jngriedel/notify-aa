import React, { useEffect, useState } from 'react';
import { Modal } from '../../components/context/Modal';

import { editSong } from '../../store/song';


import { useDispatch, useSelector } from 'react-redux';
import {getPlaylists} from '../../store/playlist'
import './EditSongModal.css'


function EditSongModal({edit, setEdit, song}) {
  const dispatch = useDispatch()
  const playlists = useSelector(state=>state.playlist)
  const [showPlaylists, setShowPlaylists] = useState(false)
  const [name, setName] = useState(song.name);
  const [errors, setErrors] = useState([])
  const [album, setAlbum] = useState(song.album);
  const [artist, setArtist] = useState(song.artist);
  const [genre, setGenre] = useState(song.genre);
  const sessionUser = useSelector(state=> state.session.user)

  useEffect(()=> {
    dispatch(getPlaylists(sessionUser.id))
  },[])

  const handleCancelEdit = () =>{
    setAlbum(song.album)
    setArtist(song.artist)
    setName(song.name)
    setGenre(song.genre)
    setEdit(false)
  }

  const handleEdit = async(e) => {
    e.preventDefault();
    setErrors([])
    const updatedSong = {
        name,
        album,
        artist,
        genre,
        mp3_url: song.mp3_url,
        user_id: sessionUser.id
    }
    const response = await dispatch(editSong(song.id, updatedSong))

    if (response.song) {

      setEdit(false)
    }
    else{
      setErrors(response.errors)
    }
  }


  return (
    <>
     {edit &&
     <Modal
        onClose={() =>{ setEdit(false); handleCancelEdit() }}>
    <div className='edit-song-modal'>
    <div className='edit-header'>
        <h1 className='edit-details'>Edit details</h1>
        <button className='cancel-button' type='button' onClick={handleCancelEdit}><i  class="fa-solid fa-x fa-lg"></i></button>
    </div>
    {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
    <form
        className='edit-song-form'
        onSubmit={handleEdit}>

            <label>Name</label>
            <input

                  className='edit-input'
                  type="text"
                  name="song"
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Album</label>
            <input
                  className='edit-input'
                  type="text"
                  name="album"
                  onChange={(e)=>setAlbum(e.target.value)}
                  value={album}
                ></input>
            <label>Artist</label>
            <input
                  className='edit-input'
                  type="text"
                  name="artist"
                  onChange={(e)=>setArtist(e.target.value)}
                  value={artist}
                ></input>
            <label className = "genre-label">Genre</label>
            <select
                className='edit-select'
                name="genre"
                id="selectoption"
                onChange={(e)=>setGenre(e.target.value)}
                value={genre}
            >
                <option value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Jazz">Jazz</option>
                <option value="Metal">Metal</option>
                <option value="Pop">Pop</option>
                <option value="Rap">Rap</option>
                <option value="Rock">Rock</option>
                <option value="Other">Other</option>
            </select>




        <button className='save-button' type='submit'>Save</button>


        </form>

        </div>
         </Modal>}




    </>
  );
}

export default EditSongModal
