import { csrfFetch } from "./csrf"

// ACTIONS
const LOAD = 'spots/LOAD'


// ACTION CREATORS
export const load = id => ({
    type: LOAD,
    id
})


// THUNKS
// export const getPokemon = () => async dispatch => {
//   const response = await fetch(`/api/pokemon`);

//   if (response.ok) {
//     const list = await response.json();
//     dispatch(load(list));
//   }
// };

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api')
}


// INITIALSTATE
// const initialState = {
//         allSpots = {},
//         singleSpot = {}
// }

// REDUCER
export default function SpotReducer(state = {}, action) {
    switch(action.type){
        default:
            return state;
    }
}