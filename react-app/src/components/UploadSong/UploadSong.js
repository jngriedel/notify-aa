import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {newSong} from '../../store/song'
import { Modal } from '../../components/context/Modal';
import ellipse_loading from '../../images/ellipse_loading.gif'
import './UploadSong.css'
import { useHistory } from 'react-router-dom';

function UploadSong({setShowUpload, showUpload}) {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state=> state.session.user)
  const [mp3errors, setMp3Errors] = useState([])


  const [imageError, setImageError] = useState([])
  const [csurfError, setCsurfError] = useState([])
  const [songError, setSongError] = useState([])

  const [mp3, setMp3] = useState(null);
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('Classical');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false)

  useEffect(()=>{
    const imageErrorTemp= []
    const csurfErrorTemp =[]
    const songErrorTemp = []

    mp3errors.map((suberror)=>{
      const error = suberror.split(':');
      if (error[0] === 'image') imageErrorTemp.push('*' + error[1])
      if (error[0] === 'other') csurfErrorTemp.push('*' + error[1])
      if (error[0] === 'mp3') songErrorTemp.push('*' + error[1])

      setImageError(imageErrorTemp)
      setCsurfError(csurfErrorTemp)
      setSongError(songErrorTemp)

    })

  },[mp3errors])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true)
    setMp3Errors([])
    setImageError([])
    setCsurfError([])
    setSongError([])

    const form = new FormData();
    form.append("mp3", mp3);
    form.append("image", image)

    form.append("name", name)
    form.append("album", album)
    form.append("artist", artist)
    form.append("genre", genre)


    const response = await dispatch(newSong(form))

      if (response.song) {
        setAlbum('')
        setName('')
        setArtist('')
        setGenre('Classical')
        setImage(null)
        setMp3(null)
        setIsUploading(false)
        setShowUpload(false)
        history.push('/profile')
      }
      else{

        setMp3Errors(response)
        setIsUploading(false)
      }
    }

const updateMp3 = (e) => {
    const file = e.target.files[0];
    setMp3(file);
}

const updateImage = (e) => {
  const file = e.target.files[0];
  setImage(file);
}

const handleCancelUpload = () =>{
  setAlbum("")
  setArtist("")
  setName("")
  setGenre("")
  setShowUpload(false)
  setMp3Errors([])

}


  return (
    <>
    {showUpload && <Modal onClose={()=>{setShowUpload(false); handleCancelUpload()}}>
    <div className='upload-song-modal'>
       <div className='edit-header'>
        <h1 className='edit-details'>Upload Song</h1>
        <button className='cancel-button' type='button' onClick={handleCancelUpload}><i  class="fa-solid fa-x fa-lg"></i></button>
    </div>
        {/* <div className="errorsList">
          {mp3errors && mp3errors.map((error, ind) => (
            <div className='individual-error' key={ind}>*{error}</div>
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
            <label>Song Name { name.length >= 90 && <span className='limit-warning' >{name.length}/100</span> }</label>
            <input
                  required
                  className="edit-input"
                  maxLength="100"
                  placeholder="Song Name"
                  type="text"
                  name="song"
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                ></input>
            <label>Album { album.length >= 90 && <span className='limit-warning' >{album.length}/100</span> }</label>
            <input
                  required
                  className="edit-input"
                  maxLength="100"
                  placeholder="Album"
                  type="text"
                  name="album"
                  onChange={(e)=>setAlbum(e.target.value)}
                  value={album}
                ></input>
            <label>Artist {artist.length >= 90 && <span className='limit-warning' >{artist.length}/100</span> }</label>
            <input
                  required
                  className="edit-input"
                  maxLength="100"
                  placeholder="Artist"
                  type="text"
                  name="artist"
                  onChange={(e)=>setArtist(e.target.value)}
                  value={artist}
                ></input>
            <label className = "genre-label">Genre</label>
            <select
                className="genre-select-options"
                name="genre"
                id="selectoption"
                onChange={(e)=>setGenre(e.target.value)}
                value={genre}

            >
                <option  selected value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Jazz">Jazz</option>
                <option value="Metal">Metal</option>
                <option value="Pop">Pop</option>
                <option value="Rap">Rap</option>
                <option value="Rock">Rock</option>
                <option value="Other">Other</option>
            </select>


            <div className='errors'>
              {imageError.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>

            <label>Album Cover (Optional) </label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />

            <div className='errors'>
              {songError.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>

            <label>Mp3 File </label>
            <input
              type="file"
              accept=".mp3"
              required
              onChange={updateMp3}
            />
            <div className='button-holder'>
              {!isUploading && <button  className='upload-button' type="submit">Upload</button> }
              {isUploading && <img className='loading-dots' alt='loading' src={ellipse_loading} />}
            </div>
        </form>

        </div>
        </Modal>}

    </>
  );
}

export default UploadSong
