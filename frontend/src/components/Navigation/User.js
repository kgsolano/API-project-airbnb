import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { loadBookingsThunk } from '../../store/bookings';
import { deleteReviewThunk, getAllUserReviews } from '../../store/reviews';
import { getAllSpots } from '../../store/spots';
import BookingIndex from '../bookings/bookingIndex';
import UserReview from '../Reviews/UserReview';




function User() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getAllUserReviews())
        dispatch(getAllSpots())
        dispatch(loadBookingsThunk())
        // console.log("is this working")
    }, [dispatch])

    const spots = useSelector((state) => Object.values(state.spots.allSpots));
    const sessionUser = useSelector(state => state.session.user)
    const bookingsObjState = useSelector(state => state.bookings)
    const bookingsObj = bookingsObjState.allBookings
    const bookings = Object.values(bookingsObj)
    console.log("this is bookings ----------",bookings)

    // console.log("this is session user --", sessionUser)
    // console.log("this is the all the spots --->", spots)

    // if (sessionUser.id === spot.ownerId)
    const filteredSpots = spots.filter((spot) => (
      spot.ownerId === sessionUser.id
    ))

    // console.log("this is filteredspots", filteredSpots)
    
    const reviewsObj = useSelector((state) => state.reviews.user)
    if(!reviewsObj) return null
    const reviews = Object.values(reviewsObj)
    // console.log('this is reviews ---->', reviews)

    // const bookingsObj = useSelector(state => state.bookings)
    // console.log(bookingsObj)


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
                src={spot?.previewImage}
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
      {!reviews.length ? <h3 className='user-spot-text'>You have not made any reviews yet</h3> :
      <ul className="user-reviews">
        {reviews.map((review) => (
          <UserReview review={review} key={review.id} />
        ))}
      </ul>
    }
    <h2>Your Trips</h2>
    <ul className='user-bookings'>
      {bookings.map((booking) => (
        <li><BookingIndex booking={booking} /></li>
      ))}
    </ul>
    </div>
  );
}

export default User