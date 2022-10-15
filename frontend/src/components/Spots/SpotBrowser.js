import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllSpots } from '../../store/spots'

const SpotBrowser = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const spots = useSelector((state) => Object.values(state.spots.allSpots))   // state/reducer/action.payload
    console.log("this is state.spots ~~~~~>", spots);
    
    
    return (
        <div>
           {spots.map((spot) => <div key={spot.id}>{spot.previewImage}</div>)}
        </div>
    )
}

export default SpotBrowser