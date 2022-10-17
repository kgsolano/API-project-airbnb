import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createReviewThunk } from '../../store/reviews'

function AddReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()

    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState('Please Select')

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            reviewText,
            rating
        }

        let createdReview = dispatch(createReviewThunk(payload))
        if (createdReview) {
            history.push(`/spots/${spotId}`)
        }
    }

  return (
    <div>
      <h2>Leave a review!</h2>
      <section>
        <form onSubmit={handleSubmit}>
          <h4>Tell us about your experience!</h4>
          <input
            type='textarea'
            placeholder='Your Review'
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            />
            <h4>Give us a rating!</h4>
            <input
                type='number'
                min='1'
                max='5'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <input type='submit' />
        </form>
      </section>
    </div>
  );
}

export default AddReview