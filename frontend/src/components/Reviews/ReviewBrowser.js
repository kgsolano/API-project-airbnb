import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews, getAllUserReviews } from '../../store/reviews'
import './reviews.css'

function ReviewBrowser({spotId, spot}) {
  const reviewsObj = useSelector((state) => state.reviews.spot);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllReviews(spotId))
        dispatch(getAllUserReviews())
    }, [dispatch, spotId])

// const reviews = useSelector((state) => Object.values(state.reviews.spot))
if (!reviewsObj) return null;
const reviews = Object.values(reviewsObj);
console.log('this is spotId -----', spotId)

    
    

    // if(reviews){
        // const spotReviews = reviews.filter((review) => (
        //     review.spotId === spotId
        // ))
        // console.log('this is spotReviews ----->', spotReviews)
    // }
  return (
    <div className="reviews-div">
      <h2>
      {spot?.avgStarRating} <i className="fa-sharp fa-solid fa-star"></i> • {" "}
      {spot?.numReviews} reviews
      </h2>
      {/* <h2>Reviews</h2> */}
      <ul className="all-reviews-div">
        {reviews &&
          reviews.map((review) => (
            <ul key={review.id} className="review-id">
              <div className="review-heading-div">
                <i className="fas fa-user-circle"></i>
                <div className="review-heading-text">
                  <h3>{review.User?.firstName}</h3>
                  <h5>
                    {review.stars} <i className="fa-sharp fa-solid fa-star"></i>
                  </h5>
                </div>
              </div>
              <p className="review-text-browser">{review.review}</p>
              {/* {review.ReviewImages[0] && 
                <img src={review.ReviewImages[0].url} alt="review-img" />} */}
            </ul>
          ))}
      </ul>
    </div>
  );
}

export default ReviewBrowser