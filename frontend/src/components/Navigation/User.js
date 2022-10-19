import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { deleteReviewThunk, getAllUserReviews } from '../../store/reviews';
import UserReview from '../Reviews/UserReview';




function User() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getAllUserReviews())
        console.log("is this working")
    }, [dispatch])

    const spots = useSelector((state) => Object.values(state.spots.allSpots));
    
    const reviewsObj = useSelector((state) => state.reviews.user)
    if(!reviewsObj) return null
    const reviews = Object.values(reviewsObj)
    console.log("this is reviews array ===>", reviews)

  return (
    <div>
      <h2>All your spots</h2>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>
            {spot.name}
            <NavLink to={`/spots/${spot.id}/edit`}>Edit a spot</NavLink>
          </li>
        ))}
      </ul>
      <h2>All your reviews</h2>
      <ul>
      {reviews.map((review) => (
        <UserReview
            review={review}
            key={review.id}
            />
      ))}
      </ul>
    </div>
  );
}

export default User