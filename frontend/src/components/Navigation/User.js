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
    const sessionUser = useSelector(state => state.session.user)

    console.log("this is session user --", sessionUser)
    console.log("this is the all the spots --->", spots)

    // if (sessionUser.id === spot.ownerId)
    const filteredSpots = spots.filter((spot) => (
      spot.ownerId === sessionUser.id
    ))

    console.log("this is filteredspots", filteredSpots)
    
    const reviewsObj = useSelector((state) => state.reviews.user)
    if(!reviewsObj) return null
    const reviews = Object.values(reviewsObj)
    console.log('this is reviews ---->', reviews)


  return (
    <div className="manage-user-div">
      <h2>All your spots</h2>
      {!filteredSpots.length ? (
        <h3 className='user-spot-text'>You have not created a spot yet</h3>
      ) : (
        <ul className="user-spots">
          {filteredSpots.map((spot) => (
            <ul key={spot.id}>
              <img
                src={spot.previewImage}
                alt="castleImg"
                className="user-img"
              />
              <br />
              {spot.name}
              <NavLink to={`/spots/${spot.id}/edit`} className="edit-link">
                Edit a spot
              </NavLink>
            </ul>
          ))}
        </ul>
      )}
      <h2>All your reviews</h2>
      <ul className="user-reviews">
        {reviews.map((review) => (
          <UserReview review={review} key={review.id} />
        ))}
      </ul>
    </div>
  );
}

export default User