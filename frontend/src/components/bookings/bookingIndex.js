import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadBookingsThunk, removeBookingThunk, updateBookingThunk } from '../../store/bookings'

function BookingIndex({booking}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [editDates, setEditDates] = useState(false)
    const [startDate, setStartDate] = useState(booking.startDate)
    const [endDate, setEndDate] = useState(booking.endDate)

    const formatDate = (date) => {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + (d.getDate() + 1),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

       const updateStartDate = (e) => {
         setStartDate(e.target.value);
       };
       const updateEndDate = (e) => {
         setEndDate(e.target.value);
       };

    
    // useEffect(() => {
    //     dispatch(loadBookingsThunk())
    // }, [dispatch])

    const handleEdit = async (e) => {
        e.preventDefault()
        setEditDates(!editDates)

        let payload = {
            startDate,
            endDate
        }
        
        await dispatch(updateBookingThunk(booking.id, payload))

       history.push('/current')
    }

    const handleDelete = async (e) => {
        await dispatch(removeBookingThunk(booking.id));
        await dispatch(loadBookingsThunk());
    };
  return (
    <div className='booking-card'>
      <div className='booking-content'>
        <img
          className="booking-img"
          src={booking?.Spot?.previewImage}
          alt="castle-img"
        />
        <div className="booking-info">
          <h3>{booking?.Spot?.name} </h3>
          <p>
            {booking.Spot?.city}, {booking?.Spot?.country}
          </p>
          <p>
            {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
          </p>
        </div>
      </div>
      <button className='edit-booking-btn' onClick={() => setEditDates(!editDates)}>Edit your booking</button>
      {editDates && (
        <div className="update-booking-div">
          <form className="user-dates-form-div" onSubmit={handleEdit}>
            <div className='user-dates-form'>
              <label className='user-booking-input'>
                CHECK-IN
                <input type="date" value={startDate} onChange={updateStartDate} />
              </label>
              <label className='user-booking-input'>
                CHECK-OUT
                <input type="date" value={endDate} onChange={updateEndDate} />
              </label>
            </div>
            <div className='user-edit-bookings-div'>
              <button type="submit">Edit Booking</button>
              <button onClick={() => {handleDelete()}}>Remove Booking</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookingIndex