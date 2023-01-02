import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteReviewThunk, getAllUserReviews } from '../../store/reviews'


function UserReview({review}) {
    const dispatch = useDispatch()
    const history = useHistory()


    // console.log('this is review array --->', review)

     const handleDelete = () => {
        let deletedReview = dispatch(deleteReviewThunk(review.id))
        if(deletedReview){
            history.push('/current')
        }
    }
  return (
    <div className="user-review-div">
      <ul key={review.id} className="user-review-card">
        <div className="user-review-content">
          <h3>Review for {review.Spot.name}:</h3>
          <p>{review.review}</p>
        </div>
        <button type="button" onClick={handleDelete} className="delete-review">
          <i class="fa-solid fa-trash"></i>
        </button>
      </ul>
    </div>
  );
}

export default UserReview