import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {newPlaylist} from '../../store/playlist'

function CreatePlaylist() {

  const dispatch = useDispatch()
  const sessionUser = useSelector(state=> state.session.user)
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');



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
      <form
        className='createPlaylist-form'
        onSubmit={handleSubmit}>

            <label>Playlist Name</label>
            <input
                  className="upload-playlistname"
                  placeholder="Playlist Name"
                  type="text"
                  name="playlist"
                  required
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Description (Optional) </label>
            <input
                  className="upload-description"
                  placeholder="Description"
                  type="text"
                  name="description"
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                ></input>

            <label>Picture (Optional) </label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Create</button>

        </form>
        <div className="errorsList">
          {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
    </>
  );
}

export default CreatePlaylist
