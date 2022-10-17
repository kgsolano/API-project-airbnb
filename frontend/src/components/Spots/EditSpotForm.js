
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk, editSpotThunk, getAllSpots } from '../../store/spots';

function EditSpotForm() {
    const {spotId} = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    console.log("spot to be editted ----", spot)
     const dispatch = useDispatch();
     const history = useHistory();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch, spot])

     // useState for the form values
     const [address, setAddress] = useState("");
     const [city, setCity] = useState("");
     const [state, setState] = useState("");
     const [country, setCountry] = useState("");
     const [lat, setLat] = useState("");
     const [lng, setLng] = useState("");
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const [price, setPrice] = useState("");

     const handleSubmit = async (e) => {
    //    e.preventDefault();

       const payload = {
        ...spot,
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

       let updatedSpot = await dispatch(editSpotThunk(payload));
       console.log("this is a updated spot", updatedSpot);
       if (updatedSpot) {
         history.push(`/spots/${spotId}`);
       }
     };

     const handleDelete = () => {
        let deletedSpot = dispatch(deleteSpotThunk(spotId))
        if(deletedSpot) {
            history.push(`/`)
        }
     }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Edit a Spot!</h1>
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
        <input type="submit" />
        <button 
            onClick={handleDelete}>
                Delete this spot!
            </button>
      </form>
    </section>
  );
}

export default EditSpotForm