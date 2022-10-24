import { csrfFetch } from "./csrf"

                /* ----ACTIONS---- */
const LOAD_ALL = 'spots/LOAD_ALL'
const LOAD_ONE = 'spots/LOAD_ONE'
const ADD = 'spots/ADD'
const ADD_IMG = 'spots/ADD_IMG'
const DELETE = 'spots/DELETE'


            /* ----ACTION CREATORS---- */
// load all spots
export const load = allSpots  => ({
    type: LOAD_ALL,
    allSpots   // allSpots called from thunk
})

// load one spot
export const loadOneSpot = spot => ({
    type: LOAD_ONE,
    spot
})

// add a spot
export const addSpot = spot => ({
    type: ADD,
    spot
})

// add an image for a new spot
export const addSpotImg = (image, spotId) => ({
    type: ADD_IMG,
    image,
    spotId
})

// delete a spot
export const deleteSpot = id => ({
    type: DELETE,
    id
})


                /* ----THUNKS---- */

// get all spots thunk
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots') // all spots data from backend

    if(response.ok){
        const allSpots = await response.json() // all spots data in js obj
        dispatch(load(allSpots))   // allSpots passed into action creator
        return allSpots
    }
}

//get one spot thunk
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)

    if(response.ok){
        const spot = await response.json()
        dispatch(loadOneSpot(spot))
    }
}

// add a spot thunk
export const addSpotThunk = (formInfo) => async dispatch => {
    console.log("this is the formInfo", formInfo)
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formInfo),
    });
    // console.log('this is new spot response', response)
    
    if(response.ok){
        const newSpot = await response.json()
        dispatch(addSpot(newSpot))
        return newSpot
    }
}

//add a url for a new spot thunk
export const addSpotImgThunk = (formInfo, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formInfo)
    });

    if(response.ok){
        const newImg = await response.json()
        dispatch(addSpotImg(formInfo, spotId))
        return newImg
    }
}


// edit a spot thunk
export const editSpotThunk = (data, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        headers : {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
    console.log("this response is working", response)
    if(response.ok) {
        const editSpot = await response.json()
        console.log("this is the edit a spot message", editSpot)
        dispatch(addSpot(editSpot))
        return editSpot
    }
}

// delete a spot thunk
export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    })

    if(response.ok){
        dispatch(deleteSpot(spotId))
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
        case LOAD_ALL:
            const loadAllState = {...state, singleSpot: {}}
            loadAllState.allSpots = {}
            action.allSpots.Spots.forEach((spot) => {   // key into Spots from backend
                loadAllState.allSpots[spot.id] = spot     // this populates the allSpots in the empty object
            })
            return loadAllState
        case LOAD_ONE:
            const loadOneState = {...state, singleSpot: {}}
            loadOneState.singleSpot = action.spot
            return loadOneState
        case ADD:
            const addState = { ...state, allSpots: { ...state.allSpots } };
            addState.allSpots[action.spot.id] = action.spot
            return addState
        case ADD_IMG:
                const addImgState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
                addImgState.allSpots[action.spotId].previewImage = action.image
                addImgState.singleSpot.SpotImages[action.image.id] = action.image
                return addImgState
        case DELETE:
            const deleteState = {...state, allSpots: {...state.allSpots}}
            delete deleteState.allSpots[action.id]
            return deleteState 
        default:
            return state;
    }
}


/* unused normalize logic */

// return (loadState[action.allSpots.id] = action.allSpots.forEach(
//   (spot) => (spot[spot.id] = spot)
// ));