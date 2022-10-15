import { csrfFetch } from "./csrf"

 /* ----ACTIONS---- */
const LOAD = 'spots/LOAD'


/* ----ACTION CREATORS---- */
export const load = allSpots  => ({
    type: LOAD,
    allSpots   // allSpots called from thunk
})


/* ----THUNKS---- */

// get all spots thunk
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots') // all spots data from backend

    if(response.ok){
        const allSpots = await response.json() // all spots data in js obj
        dispatch(load(allSpots))   // allSpots passed into action creator
    }
}


/* ----INITIAL STATE---- */
const initialState = {
        allSpots: {},
        singleSpot: {}
}

/* ----REDUCER---- */
export default function SpotsReducer(state = initialState, action) {
    switch(action.type){
        case LOAD:
            const loadState = {...state}
            action.allSpots.Spots.forEach((spot) => {   // key into Spots from backend
                loadState.allSpots[spot.id] = spot      // normalize array
            })
            return loadState
            
        default:
            return state;
    }
}


/* unused normalize logic */

// return (loadState[action.allSpots.id] = action.allSpots.forEach(
//   (spot) => (spot[spot.id] = spot)
// ));