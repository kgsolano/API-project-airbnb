import React, { useEffect, useState } from 'react'
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
    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {

      const errors = []
      if (!address.length) errors.push("address cannot be empty")
      if (!city.length) errors.push("City cannot be empty")
      if (!state.length) errors.push("State cannot be empty")
      if (!country.length) errors.push("Country cannot be empty")
      // if (lat !== typeof Number) errors.push("Please enter a valid number")
      // if (lng !== typeof Number) errors.push("Please enter a valid number")
      if (!name.length) errors.push("Please enter a valid name")
      if (!description.length) errors.push("Description cannot be empty")
      if (!price.match(/^\d+/)) errors.push("Price should be a valid number"); 
       if (!/^https?:\/\/.+\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(url)) {
         errors.push(
           "Url must be end with a valid .jpg, .png, or .jpeg"
         );
       }

      setValidationErrors(errors);
    }, [address, city, state, country, name, description, price, url])



    const handleSubmit = async (e) => {
        e.preventDefault()

        setHasSubmitted(true);
        if (validationErrors.length) return alert('cannot submit')
        const payload = {
            address,
            city,
            state,
            country,
            // lat,
            // lng,
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

        // reset form state
        setAddress("")
        setCity("")
        setState("")
        setCountry("")
        // setLat("")
        // setLng("")
        setName("")
        setDescription("")
        setPrice("")
        setValidationErrors([])
        setHasSubmitted(false)
    }
  return (
    <section className="add-spot-form-div">
      {hasSubmitted && !!validationErrors.length && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="add-spot-form">
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
        {/* <input
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
        <br /> */}
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
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input type="submit" value="Create new spot" className="submit-btn" />
      </form>
    </section>
  );
}

export default AddSpot