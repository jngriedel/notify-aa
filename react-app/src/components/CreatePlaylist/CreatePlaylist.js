import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {newPlaylist} from '../../store/playlist'
import { Modal } from '../../components/context/Modal';
import './CreatePlaylist.css'

function CreatePlaylist({setShowCreatePlaylist, showCreatePlaylist}) {

  const dispatch = useDispatch()
  const sessionUser = useSelector(state=> state.session.user)
  const [errors, setErrors] = useState([])
  const [imageError, setImageError] = useState([])
  const [csurfError, setCsurfError] = useState([])

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    const imageErrorTemp= []
    const csurfErrorTemp =[]

    errors.map((suberror)=>{
      const error = suberror.split(':');
      if (error[0] === 'image') imageErrorTemp.push('*' + error[1])
      if (error[0] === 'other') csurfErrorTemp.push('*' + error[1])

      setImageError(imageErrorTemp)
      setCsurfError(csurfErrorTemp)

    })

  },[errors])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    setImageError([])
    setCsurfError([])
    const form = new FormData();
    form.append("image", image);
    form.append('name', name);
    form.append('description', description);


    const response = await dispatch(newPlaylist(form))

    if (response.playlist) {
      setName('')
      setDescription('')
      setImage(null)
      // setSuccess(true)
      setShowCreatePlaylist(false)
    }
    else {
      setErrors(response)
    }
}

const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
}

const handleCancelCreate = () =>{
  setImage(null)
  setName("")
  setDescription("")
  setShowCreatePlaylist(false)
  setErrors([])

}



  return (
    <>
    {showCreatePlaylist &&
    <Modal onClose={()=>{setShowCreatePlaylist(false); handleCancelCreate()}}>
    <div className='upload-song-modal'>
      <div className='edit-header'>
        <h1 className='edit-details'>Create Playlist</h1>
        <button className='cancel-button' type='button' onClick={handleCancelCreate}><i  class="fa-solid fa-x fa-lg"></i></button>
    </div>
      {/* <div className="errorsList">
          {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
      <form
        className='upload-song-form'
        onSubmit={handleSubmit}>

            <div className='errors'>
              {csurfError.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <label>Playlist Name { name.length >= 90 && <span className='limit-warning' >{name.length}/100</span> }</label>
            <input
                  className="edit-input"
                  placeholder="Playlist Name"
                  type="text"
                  maxLength='100'
                  name="playlist"
                  required
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Description (Optional) { description.length >= 245 && <span className='limit-warning' >{description.length}/255</span> } </label>
            <textarea
                  className="edit-input-textarea"
                  placeholder="Description"
                  type="text"
                  maxLength='255'

                  name="description"
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                ></textarea>
            <div className='errors'>
              {imageError.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <label>Picture (Optional) </label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <div className='button-holder'>
              <button className='upload-button' type="submit">Create</button>
            </div>
        </form>

        </div>
        </Modal>}
        <div className='success' style={{visibility: success? 'visible' : 'hidden'}}>success</div>
    </>
  );
}

export default CreatePlaylist
