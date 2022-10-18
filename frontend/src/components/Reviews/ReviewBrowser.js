import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../../store/reviews'

function ReviewBrowser({spot}) {
    const reviews = useSelector((state) => Object.values(state.reviews.spot))
    
    console.log('this is the reviews --->', reviews)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllReviews(spot.id))
    }, [dispatch, spot.id])

    // if(reviews){
        const spotReviews = reviews.filter((review) => (
            review.spotId === spot.id
        ))
    // }
  return (
    <div>
        <h2>Reviews</h2>
        <ul>
        {reviews && 
            spotReviews.map((review) => (
                <li key={review.id}>{review.review}</li>
            ))}

        </ul>

    </div>
  )
}

export default ReviewBrowser