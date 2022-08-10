// constants

const SET_PLAYER = 'session/SET_PLAYER';







export const setPlayer = (player) => ({
  type: SET_PLAYER,
  payload: player
})




const initialState = [];









export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SET_PLAYER: {

      return [action.payload]
    }


    default:
      return state;
  }
}
