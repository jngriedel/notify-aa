import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {newPlaylist} from '../../store/playlist'
import { Modal } from '../../components/context/Modal';
import './CreatePlaylist.css'

function EditProfileModal({showEditProfile, setShowEditProfile}) {

  const dispatch = useDispatch()
  const sessionUser = useSelector(state=> state.session.user)
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null);
//   const [name, setName] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    const form = new FormData();
    form.append("image", image);
    form.append('name', name);
    form.append('description', description);


    const response = await dispatch(newPlaylist(form))

    if (response.playlist) {
      setName('')
      setDescription('')
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
    {showEditProfile &&
    <Modal onClose={()=>{setshowEditProfile(false); handleCancelCreate()}}>
    <div className='upload-song-modal'>
      <div className='edit-header'>
        <h1 className='edit-details'>Profile Details</h1>
        <button className='cancel-button' type='button' onClick={handleCancelCreate}><i  class="fa-solid fa-x fa-lg"></i></button>
    </div>
      <form
        className='upload-song-form'
        onSubmit={handleSubmit}>


            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button className='upload-button' type="submit">Save</button>

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

export default EditProfileModal
