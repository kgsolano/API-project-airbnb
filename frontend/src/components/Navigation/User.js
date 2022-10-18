import React from 'react'
import {useSelector} from 'react-redux'

function User() {
    const spots = useSelector((state) => Object.values(state.spots.allSpots));
    const reviews = useSelector((state) => Object.values(state.reviews.spot));
    console.log("this is the reviews variable ---> ", reviews)
  return (
    <div>
        <h2>All your spots</h2>
            {spots.map((spot) => (
                <ul key={spot.id}>{spot.name}</ul>
            ))}
        <h2>All your reviews</h2>
            {reviews.map((review) => (
                <ul key={review.id}>{review.review}</ul>
            ))}
    </div>
  )
}

export default User