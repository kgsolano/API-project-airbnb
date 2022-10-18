import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import AddReview from "../Reviews/AddReview";
import ReviewBrowser from "../Reviews/ReviewBrowser";
import { getAllReviews } from "../../store/reviews";

function SpotDetail() {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spot[spot.id]);
  console.log("this is the reviews --->", reviews);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews(spotId));
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

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
      <div className="spot-photo">image</div>
      <div className="description">
        <h4>{spot.description}</h4>
      </div>
      <div className="reviews">
        <ReviewBrowser spot={spot} />
        <h4>
            <AddReview />
      
        </h4>
      </div>
    </div>
  );
}

export default SpotDetail;
