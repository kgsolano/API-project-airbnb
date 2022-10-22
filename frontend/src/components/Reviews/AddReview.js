import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createReviewThunk, getAllReviews, getAllUserReviews } from '../../store/reviews'

function AddReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()
    const user = useSelector((state) => state.session.user)
    const spotOwner = useSelector(state => state.spots.singleSpot.ownerId)
    console.log('this is spotOwner --->', spotOwner )
    const spotReview = useSelector((state) => state.reviews.spot)
    const spotReviewUser = Object?.values(spotReview)


    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [errors, setErrors] = useState([])

    // useEffect(() => {
    // dispatch(getAllUserReviews());
    // }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()

      

        const payload = {
            spotId,
            userId: user.id,
            review,
            stars: rating
        }
        // console.log('this is the conditional', !(user?.id === spotReviewUser[0]?.User.id));

        // if( !(spotOwner === user?.id)) return setErrors(["User cannot submit a review for a spot they own"]);

        if (
          !(user?.id === spotReviewUser[0]?.User?.id)) {
          setErrors([]);
          let createdReview = await dispatch(createReviewThunk(payload)).catch(
            async (res) => {
              const data = await res.json();
              console.log("this is my data", data);
              if (data && data.errors) setErrors(data.errors);
            }
          );
          console.log("this is createdReview", createdReview);

          if (createdReview) {
            history.push(`/spots/${spotId}`);
            dispatch(getAllReviews(spotId));
          }
        } else {
          return setErrors([
            "User has already submitted a review for this spot",
          ]);
        }
            
          setReview("")
          setRating("")
    }

  return (
    <div className="add-review-div">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      {spotOwner !== user?.id && (
        <>
          <h2>Leave a review!</h2>
          <section>
            <form onSubmit={handleSubmit} className="review-form-div">
              <h4>Tell us about your experience!</h4>
              <input
                className="review-text"
                type="textarea"
                placeholder="Write a Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <h3>Give us a rating!</h3>
              <input
                className="rating-input"
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />{" "}
              <i className="fa-sharp fa-solid fa-star"></i>
              <br />
              <input type="submit" className="rating-submit" />
            </form>
          </section>
        </>
      )}
    </div>
  );
}

export default AddReview