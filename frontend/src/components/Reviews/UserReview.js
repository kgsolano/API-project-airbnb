import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteReviewThunk } from '../../store/reviews'


function UserReview({review}) {
    const dispatch = useDispatch()
    const history = useHistory()

    console.log('this is review --->', review.Spot.id)

     const handleDelete = () => {
        let deletedReview = dispatch(deleteReviewThunk(review.id))
        if(deletedReview){
            history.push('/current')
        }
    }
  return (

    <div className='user-review-div'>
      <ul key={review.id}>
        Listing #{review.Spot.id}: {review.review}
        <button type="button" onClick={handleDelete} className='delete-review'>
          Delete this review
        </button>
      </ul>
    </div>
  );
}

export default UserReview