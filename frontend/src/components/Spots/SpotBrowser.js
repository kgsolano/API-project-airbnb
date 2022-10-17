import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllSpots } from '../../store/spots'

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
            <div key={spot.id} className='spot-card'>
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
            </div>)}
        </div>
    )
}

export default SpotBrowser