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
      body: JSON.stringify(song),
    }
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(addSong(data));
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
