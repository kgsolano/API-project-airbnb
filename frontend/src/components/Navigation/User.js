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
   

    console.log("this is session user --", sessionUser)
    // console.log("this is the all the spots --->", spots)

    // if (sessionUser.id === spot.ownerId)
    const filteredSpots = spots.filter((spot) => (
      spot.ownerId === sessionUser.id
    ))

    // console.log("this is filteredspots", filteredSpots)
    
    const reviewsObj = useSelector((state) => state.reviews.user)
    if(!reviewsObj) return null
    const reviews = Object.values(reviewsObj)
    console.log('this is reviews ---->', reviews)

    // const bookingsObj = useSelector(state => state.bookings)
    // console.log(bookingsObj)


  return (
    <div className="user-parent">
      <div className="user-greeting">
        <h1 className="user-title">Hello, {sessionUser.username}</h1>
        <p className="user-email">{sessionUser.email}</p>
      </div>
      <div className="manage-user-div">
        <div className="user-bookings-div">
          <h2>Manage your Trips</h2>
          <ul className="user-bookings">
            {bookings.map((booking) => (
              <div className='booking-card-div'>
                <BookingIndex booking={booking} />
              </div>
            ))}
          </ul>
        </div>
        <div className="spot-review-parent">
          <div className="user-spots-div">
            <h2>Manage your listings</h2>
            {!filteredSpots.length ? (
              <h3 className="user-spot-text">
                You have not created a listing yet
              </h3>
            ) : (
              <ul className="user-spots">
                {filteredSpots.map((spot) => (
                  <ul className="user-spot-card" key={spot.id}>
                    <img
                      src={spot?.previewImage}
                      alt="castleImg"
                      className="user-img"
                    />
                    <br />
                    <div className="user-spot-card-text">
                      <h4>
                        {" "}
                        {spot.city}, {spot.country}{" "}
                      </h4>
                      <span className="user-spot-card-header">
                        <i className="fa-sharp fa-solid fa-star"></i>
                        {spot?.avgRating} • {spot?.numReviews} reviews
                      </span>
                    </div>
                    <div className="user-spot-card-content">
                      <p>{spot.name}</p>
                      <p>
                        <span className="price">{spot.price}</span>/night
                      </p>
                    </div>
                    <NavLink
                      to={`/spots/${spot.id}/edit`}
                      className="edit-link"
                    >
                      Edit this listing
                    </NavLink>
                  </ul>
                ))}
              </ul>
            )}
          </div>
          <div className="user-reviews-div">
            <h2>Manage your reviews</h2>
            {!reviews.length ? (
              <h3 className="user-review-text">
                You have not made any reviews yet
              </h3>
            ) : (
              <ul className="user-reviews">
                {reviews.map((review) => (
                  <UserReview review={review} key={review.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User