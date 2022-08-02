// constants
const ADD_SONG = 'session/ADD_SONG';



const addSong = (song) => ({
  type: ADD_SONG,
  payload: song
})

const initialState = {};




export const newSong = (song) => async (dispatch) => {
  const response = await fetch('/api/songs', {
    method: 'POST',
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
    return data.errors
  }
};




export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG:
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState

    default:
      return state;
  }
}
