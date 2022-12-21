import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import { getAllSpots, getOneSpot } from "../../store/spots";
import AddReview from "../Reviews/AddReview";
import ReviewBrowser from "../Reviews/ReviewBrowser";
import { getAllReviews } from "../../store/reviews";
import { addBookingThunk } from "../../store/bookings";

function SpotDetail() {
  const { spotId } = useParams();
  const history = useHistory()
  const sessionUser = useSelector(state => state?.session.user)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews(spotId));
    
    setTimeout(() => {
      dispatch(getOneSpot(spotId));
      // dispatch(getAllSpots())
    }, 100)
  }, [dispatch, spotId]);

  
  // const reviewsObj = useSelector((state) => state.reviews.user);
  const spot = useSelector((state) => state?.spots?.singleSpot);
  // console.log(spot)

  // conditionally rendered spots
  if(!spot?.id) return null

    const updateStartDate = (e) => {
    setStartDate(e.target.value)

  };
  const updateEndDate = (e) => {
    setEndDate(e.target.value)

  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    let payload = {
      spotId: spot.id,
      userId: sessionUser,
      startDate,
      endDate
    }
    console.log('this is the payload', payload)

    let newBooking = await dispatch(addBookingThunk(spot.id, payload))
    console.log("this is newbooking -----------",newBooking)

    if(newBooking){
      history.push('/')
    }
  }
  

  // let avgStarRating;
  // if (spot?.avgStarRating === null){
  //   avgStarRating = "0"
  // } else if (typeof spot?.avgStarRating === 'number'){
  //   avgStarRating = parseFloat(spot?.avgStarRating).toFixed(1)
  // } else if (typeof Number(spot?.avgStarRating) === 'number'){
  //   avgStarRating = Number(parseFloat(spot?.avgStarRating).toFixed(1))
  // }
  

  //conditionally rendered reviews
  // if (!reviewsObj) return null;
  // const reviews = Object.values(reviewsObj);
  // if(!reviews.length) return null
  // console.log("this is the review ----", reviews)
  
  // const reviews = useSelector((state) => state.reviews.spot[spotId]);

  // console.log("this is the reviews --->", reviews);


  //dispatch review
  return (
    <div className="spot-detail-page">
      <div className="spot-title">
        <h1>{spot?.name}</h1>
        <p>
          {spot?.avgStarRating} <i className="fa-sharp fa-solid fa-star"></i> •{" "}
          {spot?.numReviews} reviews • {spot?.city}, {spot?.state}
        </p>
      </div>
      <div className="spot-photo-div">
        <img
          src={spot?.SpotImages[0]?.url}
          alt="spot-img"
          className="spot-photo"
        />
      </div>
      <div className="spot-description">
        <h2>
          Entire Castle hosted by {spot?.Owner?.firstName}{" "}
          {spot?.Owner?.lastName}
        </h2>
        <p>50 guests • 12 bedrooms • 15 beds • 10 bathrooms </p>
        <p>{spot?.description}</p>
      </div>
      <div className="bookings-card-div">
        <div className="spot-info">
          <h4>${spot.price}/night</h4>
          <span className="review-info-header">
            {spot?.avgStarRating} <i className="fa-sharp fa-solid fa-star"></i>
            {spot?.numReviews} reviews
          </span>
        </div>
        <div className="dates-form-container">
          <form className="dates-form" onSubmit={handleSubmit}>
            <label>
              CHECK-IN 
              <input
                type="date"
                value={startDate}
                onChange={updateStartDate}
                />
            </label>
            <label>
              CHECK-OUT
              <input
                type="date"
                value={endDate}
                onChange={updateEndDate}
                />
            </label>
          {sessionUser &&
          <button type='submit'>Book Stay</button>
          }
          </form>
        </div>
      </div>
      {sessionUser && (
        <div className="reviews">
          <ReviewBrowser spotId={spotId} />
          <h4>
            <AddReview />
          </h4>
        </div>
      )}
    </div>
  );
}

export default SpotDetail;
