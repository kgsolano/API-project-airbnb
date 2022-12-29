import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addSpotThunk, getAllSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import './spots.css'

const SpotBrowser = () => {
    const spotsObj = useSelector((state) => state.spots.allSpots)   // state/reducer/action.payload
    const spots = Object.values(spotsObj)
    // console.log("this is the spots variable", spots)
    

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch, spots.length])


    
    // console.log("this is the spotsObj ---->", spotsObj)
    if(!spotsObj) return null

    
    

  
    
    return (
      <div className="spot-browser-div">
        {spots &&
          spots.map((spot) => (
            <Link
              to={`/spots/${spot.id}`}
              key={spot.id}
              className="link-wrapper"
            >
              <div className="spot-card">
                <img
                  src={spot?.previewImage}
                  alt="castleImg"
                  className="spot-img"
                ></img>
                <div className="title">
                  <h4>
                    {spot.city}, {spot.state}
                  </h4>
                  <p>
                    {isNaN(spot.avgRating) ? "No reviews yet" : spot.avgRating}{" "}
                    <i className="fa-sharp fa-solid fa-star"></i>
                  </p>
                </div>
                <div className="description">
                  <p className="description-text">{spot.name}</p>
                  <p className="description-price">${spot.price} per night</p>
                </div>
              </div>
            </Link>
          ))}
        {/* <Link to={'/spots/new'}>
                <button>
                    Become a Host! (create spot)
                </button>
            </Link> */}
      </div>
    );
}

export default SpotBrowser