import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../../store/reviews'
import './reviews.css'

function ReviewBrowser({spotId}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])
    
    // const reviews = useSelector((state) => Object.values(state.reviews.spot))
     const reviewsObj = useSelector((state) => state.reviews.spot);
     if (!reviewsObj) return null;
     const reviews = Object.values(reviewsObj);
     console.log('this is reviews -----', reviews)
    
    
    

    // if(reviews){
        // const spotReviews = reviews.filter((review) => (
        //     review.spotId === spotId
        // ))
        // console.log('this is spotReviews ----->', spotReviews)
    // }
  return (
    <div className='reviews-div'>
      <h2>Reviews</h2>
      <ul className='all-reviews-div'>
        {reviews &&
          reviews.map((review) => (
            <ul key={review.id} className='review-id'>
              <h3>Review by {review.User.firstName}</h3>
              <p>{review.stars} stars</p>
              <p>{review.review}</p>
            </ul>
          ))}
      </ul>
    </div>
  );
}

export default ReviewBrowser