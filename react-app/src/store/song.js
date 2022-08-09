// constants
const ADD_SONG = 'session/ADD_SONG';
const SET_SONGS = 'session/SET_SONGS';
const REMOVE_SONG = 'session/REMOVE_SONG';




const addSong = (song) => ({
  type: ADD_SONG,
  payload: song
})

export const setSongs = (songs) => ({
  type: SET_SONGS,
  payload: songs
})
export const removeSong = (songId) => ({
  type: REMOVE_SONG,
  payload: songId
})



const initialState = {};




export const newSong = (song) => async (dispatch) => {
  const response = await fetch('/api/songs', {
    method: 'POST',
    body: song
  });

  const data = await response.json()
  if (response.ok) {
    dispatch(addSong(data.song));

    return data
  }
  else {
    // const data = await response.json()
    return data.errors
  }
};
export const getSongs = (userId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${userId}`);

  const data = await response.json()
  if (response.ok) {
    dispatch(setSongs(data.songs));

    return data.songs
  }
  else {

    return data
  }
};
export const getAllSongs = () => async (dispatch) => {
  const response = await fetch(`/api/songs`);

  const data = await response.json()
  if (response.ok) {
    dispatch(setSongs(data.songs));

    return data.songs
  }
  else {

    return data
  }
};
export const deleteSong = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: 'DELETE'
  });

  const data = await response.json()
  if (response.ok) {
    dispatch(removeSong(data.songId));

    return data.songId
  }
  else {
    // const data = await response.json()
    return data
  }
};
export const editSong = (songId, song) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(song),

  });

  const data = await response.json()
  if (response.ok) {
    dispatch(addSong(data.song));

    return data
  }
  else {
    // const data = await response.json()
    return data
  }
};




export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
   }
    case SET_SONGS: {
      const newState = {}
      action.payload.forEach(song => {
          newState[song.id] = song
      });
      return newState
    }
    case REMOVE_SONG: {
      const newState = {...state}
        delete newState[action.payload]
      return newState
    }

    default:
      return state;
  }
}
