import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addSpotImgThunk, addSpotThunk } from '../../store/spots'

function AddSpot() {
    
    // const spot = useSelector(state => state.spots.allSpots)
    const dispatch = useDispatch()
    const history = useHistory()
  

    // useState for the form values
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        const imgPayload = {
          url,
          preview: true
        }

        let createdSpot = await dispatch(addSpotThunk(payload))
        if (createdSpot) {
          // dispatch new url thunk
          dispatch(addSpotImgThunk(imgPayload, createdSpot.id))
            history.push('/')
        }
        console.log("this is a created spot", createdSpot)
    }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Add a Spot!</h1>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder='URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          />
        <input type="submit" />
      </form>
    </section>
  );
}

export default AddSpot