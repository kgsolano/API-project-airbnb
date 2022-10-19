import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createReviewThunk } from '../../store/reviews'

function AddReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()
    const user = useSelector((state) => state.session.user)


    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            spotId,
            userId: user.id,
            review,
            stars: rating
        }

        let createdReview = dispatch(createReviewThunk(payload))
        if (createdReview) {
            history.push(`/spots/${spotId}`)
            console.log("this is the payload", payload)
        }
    }

  return (
    <div className='add-review-div'>
      <h2>Leave a review!</h2>
      <section>
        <form onSubmit={handleSubmit} className='review-form-div'>
          <h4>Tell us about your experience!</h4>
          <input
            className='review-text'
            type='textarea'
            placeholder='Write a Review'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            />
            <h3>Give us a rating!</h3>
            <input
                className='rating-input'
                type='number'
                min='1'
                max='5'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <br />
            <input type='submit' className='rating-submit'/>
        </form>
      </section>
    </div>
  );
}

export default AddReview