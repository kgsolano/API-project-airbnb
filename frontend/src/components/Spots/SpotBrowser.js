import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addSpotThunk, getAllSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import './spots.css'

const SpotBrowser = () => {
    
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getAllSpots())
    // }, [dispatch])

    const spots = useSelector((state) => Object.values(state.spots.allSpots))   // state/reducer/action.payload
    // console.log("this is state.spots ~~~~~>", spots);
    
  
    
    return (
        <div>
            
           {spots.map((spot) =>
           <Link to={`/spots/${spot.id}`} key={spot.id}>
            <div className='spot-card'>
                <img
                    src={spot.previewImage}
                    alt='castleImg'
                >
                </img>
                <div className='title'>
                    <h4>{spot.city}, {spot.state}</h4>
                    <p>{spot.avgRating}</p>
                </div>
                <div className='description'>
                    <p>{spot.description}</p>
                    <p>${spot.price} per night</p>
                </div>
            </div>
            </Link>
            )}
            <Link to={'/spots/new'}>
                <button>
                    Become a Host! (create spot)
                </button>
            </Link>
        </div>
    )
}

export default SpotBrowser