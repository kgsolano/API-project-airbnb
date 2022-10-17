import { csrfFetch } from "./csrf"

/* ----ACTIONS---- (need CRD)*/
const LOAD = 'reviews/LOAD'
const CREATE = 'reviews/CREATE'
const DELETE = 'reviews/DELETE'


/* ----ACTION CREATORS---- */
// load all reviews
export const load = allReviews => ({
    type: LOAD,
    allReviews // all reviews gets passed in here from line 20
})

// create a review for a spot
export const createReview = review => ({
    type: CREATE,
    review
})

// delete a review for a spot
export const deleteReview = id => ({
    type: DELETE,
    id
})

/* ----THUNKS---- */

// get all reviews thunk
export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        const allReviews = await response.json()
        dispatch(load(allReviews))
    }
}

// add a review thunk
export const createReviewThunk = (formInfo) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${formInfo.spotId}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formInfo)
    })

    if(response.ok){
        const newReview = response.json()
        dispatch(createReview(newReview))
        return newReview
    }

}

// delete a review thunk
export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(deleteReview(reviewId))
    }
}

/* ----INITIAL STATE---- */
const initialState = {
    spot: {},
    user: {}
}

/* ----REDUCER---- */
export default function ReviewsReducer(state = initialState, action) {
    switch(action.type){
        case LOAD:
            const loadState = {...state}
            action.allReviews.Reviews.forEach((review) => {
                loadState.spot[review.id] = review
            })
            return loadState
        case CREATE:
            const addState = {...state, spot:{...state.spot}, user: {...state.user}}
            addState.spot[action.review.id] = action.review
            return addState
        case DELETE:
            const deleteState = {...state}
            delete deleteState[action.review]
            return deleteState
        default:
            return state
    }
}