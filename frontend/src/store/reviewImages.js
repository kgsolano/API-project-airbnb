import { csrfFetch } from "./csrf"

// CONSTANTS 
const LOAD_REVIEW_IMGS = 'reviewImages/LOAD_REVIEW_IMGS'
const GET_REVIEW_IMG = 'reviewImages/GET_REVIEW_IMG'
const ADD_REVIEW_IMG = 'reviewImages/ADD_REVIEW_IMG'
const DELETE_REVIEW_IMG =  'reviewImages/DELETE_REVIEW_IMG'

// ACTION CREATORS 
const loadReviewImages = (reviewImage) => ({
    type: LOAD_REVIEW_IMGS,
    reviewImage
})

const getReviewImage = (reviewImage) => ({
    type: GET_REVIEW_IMG,
    reviewImage
})

const addReviewImage = (reviewId, reviewImage) => ({
  type: ADD_REVIEW_IMG,
  reviewImage,
  reviewId,
});

const deleteReviewImage = (reviewImage) => ({
    type: DELETE_REVIEW_IMG,
    reviewImage
})

// THUNKS

export const loadReviewImagesThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}/reviewImg`)

    if(response.ok){
        const data = await response.json()
        dispatch(loadReviewImages(data))
        return data;
    } else if(response.status < 500){
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        } else {
          return ["An error occurred. Please try again."];
        }
    }
}

export const addReviewImageThunk = (reviewId, imgUrl, form) => async dispatch => {
    const formData = new FormData();
    const image = imgUrl

    formData.append("image", image)

    const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: formData
    })

    if(response.ok){
        const data = await response.json()
        dispatch(addReviewImage(reviewId, data))
    }
}

export const deleteReviewImageThunk = (imageId) => async dispatch => {
    const response = await csrfFetch(`/api/review-images/${imageId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
      await dispatch(deleteReviewImage(imageId));
      return;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

// REDUCER 

const initialState = {reviewImages: {}};
export default function ReviewImageReducer(state = initialState, action){
    switch(action.type) {
        case LOAD_REVIEW_IMGS:
            const reviewImages = normalizeArray(action.reviewImage);
            return {...state, reviewImages: {reviewImages}}
        case ADD_REVIEW_IMG:
            const addReviewImageState = {...state, reviewImages: {...state.reviewImages}}
            addReviewImageState.reviewImages[action.reviewId].url = action.reviewImage
            return addReviewImageState
        case DELETE_REVIEW_IMG:
            const deleteState = {...state}
            delete deleteState.reviewImages[action.reviewImage]
            return deleteState;
        default:
            return state;
    }
}

//HELPERS
function normalizeArray(dataArray) {
  if (!dataArray instanceof Array)
    throw new Error("Normalize problem: data invalid");
  const obj = {};
  dataArray.forEach((element) => {
    obj[element.id] = element;
  });
  return obj;
}