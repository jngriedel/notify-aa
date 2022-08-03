// constants
const ADD_PLAYLIST = 'session/ADD_PLAYLIST';
const SET_PLAYLISTS = 'session/SET_PLAYLISTS';
const REMOVE_PLAYLIST = 'session/REMOVE_PLAYLIST';




const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST,
  payload: playlist
})

const setPlaylists = (playlists) => ({
  type: SET_PLAYLISTS,
  payload: playlists
})
const removePlaylist = (playlistId) => ({
  type: REMOVE_PLAYLIST,
  payload: playlistId
})



const initialState = {};




export const newPlaylist = (playlist) => async (dispatch) => {
  const response = await fetch('/api/playlists', {
    method: 'POST',

    body: playlist
  });

  const data = await response.json()
  if (response.ok) {
    dispatch(addPlaylist(data.playlist));

    return data
  }
  else {

    return data.errors
  }
};
export const getPlaylists = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/playlists`);

  const data = await response.json()
  if (response.ok) {
    dispatch(setPlaylists(data.playlists));

    return data.playlists
  }
  else {

    return data
  }
};
export const deletePlaylist = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: 'DELETE'
  });

  const data = await response.json()
  if (response.ok) {

    dispatch(removePlaylist(data.playlistId));

    return data
  }
  else {

    return data
  }
};
export const editPlaylist = (playlistId, playlist) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(playlist),

  });

  const data = await response.json()
  if (response.ok) {
    dispatch(addPlaylist(data.playlist));

    return data
  }
  else {

    return data
  }
};




export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYLIST: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
   }
    case SET_PLAYLISTS: {
      const newState = {}
      action.payload.forEach(playlist => {
          newState[playlist.id] = playlist
      });
      return newState
    }
    case REMOVE_PLAYLIST: {
      const newState = {...state}
        delete newState[action.payload]
      return newState
    }

    default:
      return state;
  }
}
