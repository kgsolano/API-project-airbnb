import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../../store/reviews'

function ReviewBrowser({spotId}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])
    
    // const reviews = useSelector((state) => Object.values(state.reviews.spot))
     const reviewsObj = useSelector((state) => state.reviews.spot);
     if (!reviewsObj) return null;
     const reviews = Object.values(reviewsObj);
    
    
    

    // if(reviews){
        // const spotReviews = reviews.filter((review) => (
        //     review.spotId === spotId
        // ))
        // console.log('this is spotReviews ----->', spotReviews)
    // }
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews &&
          reviews.map((review) => <li key={review.id}>{review.review}</li>)}
      </ul>
    </div>
  );
}

export default ReviewBrowser