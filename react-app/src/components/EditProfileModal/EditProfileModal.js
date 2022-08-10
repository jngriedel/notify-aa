import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/session';
import { Modal } from '../../components/context/Modal';
import './EditProfileModal.css'

function EditProfileModal({showEditProfile, setShowEditProfile}) {

  const dispatch = useDispatch()
  const sessionUser = useSelector(state=> state.session.user)
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(sessionUser.username);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    const form = new FormData();
    form.append("image", image);
    form.append("username", username);

    const response = await dispatch(updateUser(form))

    if (response.user) {
      setShowEditProfile(false)
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
  setUsername(sessionUser.username)
  setErrors([])
  setShowEditProfile(false)

}



  return (
    <>
    {showEditProfile &&
    <Modal onClose={()=>{setShowEditProfile(false); handleCancelCreate()}}>
    <div className='edit-profile-modal'>
      <div className='edit-header'>
        <h1 className='edit-details'>Profile Details</h1>
        <button className='cancel-button' type='button' onClick={handleCancelCreate}><i  class="fa-solid fa-x fa-lg"></i></button>
    </div>
    <div className="errorsList">
          {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      <form
        className='upload-song-form'
        onSubmit={handleSubmit}>


<label>Username  { username.length >= 30 && <span className='limit-warning' >{username.length}/40</span> }</label>

<input

      className='edit-input'
      required
      type="text"
      name="username"
      maxlength="40"
      onChange={(e)=>setUsername(e.target.value)}
      value={username}
    ></input>

      <label>Change Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <div className='button-holder'>
             <button className='upload-button' type="submit">Save</button>
            </div>

        </form>

        </div>
        </Modal>}

    </>
  );
}

export default EditProfileModal
