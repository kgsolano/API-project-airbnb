import { csrfFetch } from "./csrf"

/* ----ACTIONS---- (need CRD)*/
const LOAD_SPOTS = 'reviews/LOAD_SPOTS'
const LOAD_USER = 'reviews/LOAD_USER'
const CREATE = 'reviews/CREATE'
const DELETE = 'reviews/DELETE'


/* ----ACTION CREATORS---- */
// load all reviews
export const loadSpotsReviews = (allReviews) => ({
    type: LOAD_SPOTS,
    allReviews // all reviews gets passed in here from line 20
})

// load user's reviews
export const loadUserReviews = (allReviews) => ({
  type: LOAD_USER,
  allReviews, // all reviews gets passed in here from line 20
});

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

// load spot's reviews thunk
export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        const allReviews = await response.json()
        dispatch(loadSpotsReviews(allReviews))
    }
}

// load user reviews
export const getAllUserReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/current`); 

  if (response.ok) {
    const userReviews = await response.json();
    dispatch(loadUserReviews(userReviews));
  }
};

// add a review thunk
export const createReviewThunk = (formInfo) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${formInfo.spotId}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formInfo)
    })

    if(response.ok){
        console.log("this is the response", response)
        const newReview = await response.json()
        console.log("this is new review", newReview)
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
        case LOAD_SPOTS:
            const loadState = {...state}
            loadState.spot = {}
            action.allReviews.Reviews.forEach((review) => {
                loadState.spot[review.id] = review
            })
            return loadState
        case LOAD_USER:
            const loadUserState = {user: {}}
            action.allReviews.Reviews.forEach((review) => {
                loadUserState.user[review.id] = review
            })
            return loadUserState
        case CREATE:
            const addState = {...state, spot:{...state.spot}}
            addState.spot[action.review.id] = action.review
            return addState
        case DELETE:
            const deleteState = {...state, user: {...state.user}}
            delete deleteState.user[action.id]
            return deleteState
        default:
            return state
    }
}