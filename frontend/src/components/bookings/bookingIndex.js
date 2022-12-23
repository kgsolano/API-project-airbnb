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
    <div>
      <img
        className="booking-img"
        src={booking?.Spot?.previewImage}
        alt="castle-img"
      />
      <div className="booking-info">
        <h5>{booking?.Spot?.name} </h5>
        <h6>
          {booking.Spot?.city}, {booking?.Spot?.country}
        </h6>
        <h6>
          {booking.startDate} to {booking.endDate}
        </h6>
      </div>
      <button onClick={() => setEditDates(!editDates)}>Edit your booking</button>
      {editDates && (
        <div className="update-booking-div">
          <form className="dates-form" onSubmit={handleEdit}>
            <label>
              CHECK-IN
              <input type="date" value={startDate} onChange={updateStartDate} />
            </label>
            <label>
              CHECK-OUT
              <input type="date" value={endDate} onChange={updateEndDate} />
            </label>
            <button type="submit">Edit Booking</button>
          </form>
          <button onClick={() => {handleDelete()}}>Remove Booking</button>
        </div>
      )}
    </div>
  );
}

export default BookingIndex