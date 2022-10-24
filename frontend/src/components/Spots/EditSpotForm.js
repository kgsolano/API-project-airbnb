
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk, editSpotThunk, getAllSpots, getOneSpot } from '../../store/spots';

function EditSpotForm() {
    const {spotId} = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    console.log("this is edit spot",spot)
     const dispatch = useDispatch();
     const history = useHistory();

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

   
     // useState for the form values
     const [address, setAddress] = useState(spot?.address);
     const [city, setCity] = useState(spot?.city);
     const [state, setState] = useState(spot?.state);
     const [country, setCountry] = useState(spot?.country);
     const [lat, setLat] = useState('');
     const [lng, setLng] = useState("");
     const [name, setName] = useState(spot?.name);
     const [description, setDescription] = useState(spot?.description);
     const [price, setPrice] = useState(spot?.price);
     const [errors, setErrors] = useState([])

      if (!spot) return null;

     const handleSubmit = async (e) => {
       e.preventDefault();

       const payload = {
         address,
         city,
         state,
         country,
         lat,
         lng,
         name,
         description,
         price,
       };

       let updatedSpot = await dispatch(editSpotThunk(payload, spotId)).catch(
         async (res) => {
           const data = await res.json();
           if (data && data.errors) setErrors(data.errors);
         }
       );;
       if (updatedSpot) {
         history.push(`/current`);
       }
     };

     const handleDelete = () => {
        let deletedSpot =  dispatch(deleteSpotThunk(spotId))
        console.log(spotId)
        if(deletedSpot ) {
            history.push(`/`)
        }
     }

  return (
    <section className="edit-spot-form-div">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="edit-spot-form">
        <h1>Edit a Spot!</h1>
        <input
          type="text"
          placeholder={spot?.address}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder={spot?.city}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder={spot?.state}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder={spot?.country}
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
          placeholder={spot?.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder={spot?.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder={spot?.price}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <input type="submit" className="submit-btn"></input>
        <button type="button" onClick={handleDelete} className="submit-btn">
          <p className="delete-text">Delete this spot!</p>
        </button>
      </form>
    </section>
  );
}

export default EditSpotForm