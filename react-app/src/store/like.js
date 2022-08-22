// constants

const ADD_LIKE = 'session/ADD_LIKE';
const REMOVE_LIKE = 'session/REMOVE_LIKE';
const GET_LIKES = 'session/GET_LIKES'



export const addLike = (song) => ({
  type: ADD_LIKE,
  payload: song
})
export const removeLike = (songId) => ({
  type: REMOVE_LIKE,
  payload: songId
})
export const getLikes = (songs) => ({
    type: GET_LIKES,
    payload: songs
})




const initialState = {};









export default function reducer(state = initialState, action) {
  switch (action.type) {

    case ADD_LIKE: {
        const newState = {...state}
        newState[action.payload.id] = action.payload
        return newState
    }
    case REMOVE_LIKE: {
        const newState = {...state}
        delete newState[action.payload]
        return newState
    }
    case GET_LIKES: {
        const newState = {}
        action.payload.forEach((song)=> {
            newState[song.id] = song
        })
        return newState
    }


    default:
      return state;
  }
}
