import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addSpotThunk, getAllSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import './spots.css'

const SpotBrowser = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    
    const spotsObj = useSelector((state) => state.spots.allSpots)   // state/reducer/action.payload
    console.log("this is the spotsObj ---->", spotsObj)
    if(!spotsObj) return null

    const spots = Object.values(spotsObj)
    
    
    
  
    
    return (
        <div className='spot-browser-div'>
           {spots && spots.map((spot) =>
           <Link to={`/spots/${spot.id}`} key={spot.id} className='link-wrapper'>
            <div className='spot-card'>
                <img
                    src={spot.previewImage}
                    alt='castleImg'
                    className='spot-img'
                >
                </img>
                <div className='title'>
                    <h4>{spot.city}, {spot.state}</h4>
                    <p>{spot.avgRating}</p>
                </div>
                <div className='description'>
                    <p className='description-text'>{spot.description}</p>
                    <p className='description-price'>${spot.price} per night</p>
                </div>
            </div>
            </Link>
            )}
            {/* <Link to={'/spots/new'}>
                <button>
                    Become a Host! (create spot)
                </button>
            </Link> */}
        </div>
    )
}

export default SpotBrowser