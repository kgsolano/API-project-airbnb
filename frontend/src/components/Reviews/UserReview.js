import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteReviewThunk } from '../../store/reviews'


function UserReview({review}) {
    const dispatch = useDispatch()
    const history = useHistory()

     const handleDelete = () => {
        let deletedReview = dispatch(deleteReviewThunk(review.id))
        if(deletedReview){
            history.push('/current')
        }
    }
  return (

    <div>
      <li key={review.id}>
        {review.review}
        <button type="button" onClick={handleDelete}>
          Delete this review
        </button>
      </li>
    </div>
  );
}

export default UserReview