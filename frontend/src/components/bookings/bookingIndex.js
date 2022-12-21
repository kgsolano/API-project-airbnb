import React from 'react'

function BookingIndex({booking}) {
  return (
    <div>
        <img className='booking-img' src={booking.Spot.previewImage} alt='castle-img' />
        <div className='booking-info'>
            <h5>{booking.Spot.name} </h5>
            <h6>{booking.Spot.city}, {booking.Spot.country}</h6>
            <h6>{booking.startDate} to {booking.endDate}</h6>
        </div>
    </div>
  );
}

export default BookingIndex