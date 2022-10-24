import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import AddReview from "../Reviews/AddReview";
import ReviewBrowser from "../Reviews/ReviewBrowser";
import { getAllReviews } from "../../store/reviews";

function SpotDetail() {
  const { spotId } = useParams();
  const sessionUser = useSelector(state => state.session.user)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews(spotId));
    
    setTimeout(() => {
      dispatch(getOneSpot(spotId));
    }, 100)
  }, [dispatch, spotId]);
  
  // const reviewsObj = useSelector((state) => state.reviews.user);
  const spot = useSelector((state) => state.spots.singleSpot);
  console.log(spot)

  // conditionally rendered spots
  if(!spot?.id) return null
  

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
          src={spot?.SpotImages[0].url}
          alt="spot-img"
          className="spot-photo"
        />
      </div>
      <div className="spot-description">
        <h2>
          Entire Castle hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}
        </h2>
        <p>50 guests • 12 bedrooms • 15 beds • 10 bathrooms </p>
        <p>{spot?.description}</p>
      </div>
      {sessionUser && 
      <div className="reviews">
        <ReviewBrowser spotId={spotId} />
        <h4>
          <AddReview />
        </h4>
      </div>
          }     
    </div>
  );
}

export default SpotDetail;
