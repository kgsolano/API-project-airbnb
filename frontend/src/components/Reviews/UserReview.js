import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteReviewThunk } from '../../store/reviews'


function UserReview({review}) {
    const dispatch = useDispatch()
    const history = useHistory()

    console.log('this is review spot --->', review)

     const handleDelete = () => {
        let deletedReview = dispatch(deleteReviewThunk(review.id))
        if(deletedReview){
            history.push('/current')
        }
    }
  return (
    <div className="user-review-div">
      {!review.length ? (
        <h3 className="user-spot-text">You have not made a review yet</h3>
      ) : (
        <ul key={review.id}>
          {review.Spot.name}: {review.review}
          <button
            type="button"
            onClick={handleDelete}
            className="delete-review"
          >
            Delete this review
          </button>
        </ul>
      )}
    </div>
  );
}

export default UserReview