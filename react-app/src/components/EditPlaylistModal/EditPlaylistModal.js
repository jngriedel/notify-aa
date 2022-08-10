import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/session';
import { Modal } from '../context/Modal';
import './EditPlaylistModal.css'
import {deletePlaylist, editPlaylist, addPlaylist} from '../../store/playlist'
import { useHistory } from 'react-router-dom';

function EditPlaylistModal({playlist, showEditPlaylist, setShowEditPlaylist}) {

  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state=> state.session.user)
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null);
  const [name, setName] = useState(playlist?.name);
  const [description, setDescription] = useState(playlist?.description);

  useEffect(()=>{
    if (playlist){
    setName(playlist.name)
    setDescription(playlist.description)
    }
  },[playlist])


  const handleEdit = async (e) => {
    e.preventDefault();
    setErrors([])
    const form = new FormData();
    form.append("image", image);
    form.append('name', name);
    form.append('description', description);


    const response = await dispatch(editPlaylist(playlist.id, form))

    if (response.playlist) {
      await dispatch(addPlaylist(response.playlist))
      setShowEditPlaylist(false)

      return
    }
    else {
      setErrors(response)
    }
}

const handleDelete = async() => {
  let result = window.confirm("This Playlist will be gone forever. Are you sure?");
  if (result) {

    const res = await dispatch(deletePlaylist(playlist.id))

    if (res.playlistId) {
      history.push('/profile')
    }
    else {
      setErrors(res)

    }
  }
}

const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
}

const handleCancelEdit = () =>{
  setImage(null)
  setName(playlist.name)
  setErrors([])
  setShowEditPlaylist(false)

}



  return (
    <>
    {showEditPlaylist &&
    <Modal onClose={()=>{setShowEditPlaylist(false); handleCancelEdit()}}>
    <div className='edit-profile-modal'>
      <div className='edit-header'>
        <h1 className='edit-details'>Playlist Details</h1>
        <button className='cancel-button' type='button' onClick={handleCancelEdit}><i  class="fa-solid fa-x fa-lg"></i></button>
    </div>
                      <form
                           className='upload-song-form'
                          onSubmit={handleEdit}>

                          <label>Name { name.length >= 90 && <span className='limit-warning' >{name.length}/100</span> }</label>
                          <input
                              className='edit-input'
                              required
                              type="text"
                              maxLength='100'
                              name="playlist name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                          ></input>
                          <label>Description { description.length >= 245 && <span className='limit-warning' >{description.length}/255</span> }</label>
                          <input
                              className='edit-input'
                              type="text"
                              maxLength='255'
                              name="description"
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
                          ></input>
                          <label>Change Picture (Optional) </label>
                          <input
                              type="file"
                              accept="image/*"
                              onChange={updateImage}
                          />




                          <div className='button-holder'>
                            <button className='upload-button' type='submit'>Save</button>
                          </div>
                          <div className='button-holder'>
                            <button onClick={handleDelete} className='upload-button' type='button'>Delete</button>
                          </div>
                      </form>
        <div className="errorsList">
          {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        </div>
        </Modal>}

    </>
  );
}

export default EditPlaylistModal
