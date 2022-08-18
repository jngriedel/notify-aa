// constants

const ADD_LIKE = 'session/ADD_LIKE';
const REMOVE_LIKE = 'session/REMOVE_LIKE';







export const addLike = (song) => ({
  type: ADD_LIKE,
  payload: song
})
export const removeLike = (song) => ({
  type: REMOVE_LIKE,
  payload: song
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
        delete newState[action.payload.id]
        return newState
    }


    default:
      return state;
  }
}
