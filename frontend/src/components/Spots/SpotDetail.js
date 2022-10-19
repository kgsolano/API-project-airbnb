import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import AddReview from "../Reviews/AddReview";
import ReviewBrowser from "../Reviews/ReviewBrowser";
import { getAllReviews } from "../../store/reviews";

function SpotDetail() {
  const { spotId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews(spotId));
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);
  
  // const reviewsObj = useSelector((state) => state.reviews.user);
  const spot = useSelector((state) => state.spots.singleSpot);
  console.log(spot)

  // conditionally rendered spots
  if(!spot?.id) return null
  
  

  //conditionally rendered reviews
  // if (!reviewsObj) return null;
  // const reviews = Object.values(reviewsObj);
  // if(!reviews.length) return null
  // console.log("this is the review ----", reviews)
  
  // const reviews = useSelector((state) => state.reviews.spot[spotId]);

  // console.log("this is the reviews --->", reviews);


  //dispatch review
  return (
    <div>
      <div className="title">
        <h1>{spot.name}</h1>
        <p>
          {spot.avgStarRating} | {spot.numReviews} reviews {spot.city}{" "}
          {spot.state}
        </p>
      </div>
      <div className="spot-photo">
        <img src={spot.SpotImages[0].url} alt='spot-img'/>
        </div>
      <div className="description">
        <p>{spot?.description}</p>
      </div>
      <div className="reviews">
        <ReviewBrowser spotId={spotId} />
        <h4>
            <AddReview />
        </h4>
      </div>
    </div>
  );
}

export default SpotDetail;
