import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getOneSpot } from '../../store/spots'


function SpotDetail() {
    const {spotId} = useParams()
    const spot = useSelector((state) => state.spots.singleSpot)
    // console.log("This is the spot ----->", spot)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])
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
        <h2>{spot.description}</h2>
      </div>
      <div className='reviews'>
        <p>reviews somehow</p>
      </div>
    </div>
  );
}

export default SpotDetail