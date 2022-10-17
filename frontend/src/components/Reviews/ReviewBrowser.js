import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../../store/reviews'

function ReviewBrowser({spot}) {
    const reviews = useSelector((state) => state.reviews.spot[spot.id])
    console.log('this is the reviews --->', reviews)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllReviews(spot.id))
    }, [dispatch, spot.id])
console.log("this is the review's id", reviews)
  return (
    <div>
        {reviews && reviews.review}
    </div>
  )
}

export default ReviewBrowser