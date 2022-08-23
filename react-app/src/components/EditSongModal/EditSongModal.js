import React, { useEffect, useState } from 'react';
import { Modal } from '../../components/context/Modal';

import { editSong } from '../../store/song';


import { useDispatch, useSelector } from 'react-redux';
import {getPlaylists} from '../../store/playlist'
import './EditSongModal.css'


function EditSongModal({edit, setEdit, song, setShowDropDown}) {
  const dispatch = useDispatch()
  const playlists = useSelector(state=>state.playlist)
  const [showPlaylists, setShowPlaylists] = useState(false)
  const [name, setName] = useState(song.name);
  const [errors, setErrors] = useState([])
  const [album, setAlbum] = useState(song.album);
  const [artist, setArtist] = useState(song.artist);
  const [genre, setGenre] = useState(song.genre);
  const sessionUser = useSelector(state=> state.session.user)

  // useEffect(()=> {
  //   dispatch(getPlaylists(sessionUser.id))
  // },[])

  const handleCancelEdit = () =>{
    setAlbum(song.album)
    setArtist(song.artist)
    setName(song.name)
    setGenre(song.genre)
    setEdit(false)
    setShowDropDown(false)
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
      setShowDropDown(false)
    }
    else{
      setErrors(response.errors)
    }
  }


  return (
    <>
     {edit &&
     <Modal
        onClose={() =>{ setEdit(false); handleCancelEdit(); }}>
    <div className='edit-song-modal'>
    <div className='edit-header'>
        <h1 className='edit-details'>Edit details</h1>
        <button className='cancel-button' type='button' onClick={handleCancelEdit}><i  class="fa-solid fa-x fa-lg"></i></button>
    </div>
    {errors &&
        <div style={{visibility: errors? 'visibile':'hidden'}} className='printed-errors'>
         {errors.map((error, ind) => (
            <div className='individual-error' key={ind}>{error}</div>
          ))}
          </div>}
    <form
        className='edit-song-form'
        onSubmit={handleEdit}>

            <label>Name  { name.length >= 90 && <span className='limit-warning' >{name.length}/100</span> }</label>

            <input

                  className='edit-input'
                  required
                  type="text"
                  name="song"
                  maxlength="100"
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>


            <label>Album  { album.length >= 90 && <span className='limit-warning' >{album.length}/100</span> }</label>
            <input
                  className='edit-input'
                  required
                  type="text"
                  name="album"
                  maxlength="100"
                  onChange={(e)=>setAlbum(e.target.value)}
                  value={album}
                ></input>
            <label>Artist  {artist.length >= 90 && <span className='limit-warning' >{artist.length}/100</span> }</label>
            <input
                  className='edit-input'
                  required
                  type="text"
                  name="artist"
                  maxlength="100"
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
