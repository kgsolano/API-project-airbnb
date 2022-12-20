import { csrfFetch } from "./csrf"

// CONSTANTS
const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS'
const GET_BOOKING = 'bookings/GET_BOOKING'
const ADD_BOOKING = 'bookings/ADD_BOOKING'
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING'

// ACTION CREATORS
const loadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
})

const getBooking = booking => ({
    type: GET_BOOKING,
    booking
})

const addBooking = booking => ({
    type: ADD_BOOKING,
    booking
})

const removeBooking = booking => ({
    type: REMOVE_BOOKING,
    booking
})

// THUNKS

export const loadBookingsThunk = () => async dispatch  => {
    const response = await csrfFetch('/api/bookings/current')

    if(response.ok){
        const data = await response.json()
        dispatch(loadBookings(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        } else {
            return ['An error occurred. Please try again.']
        }
    }
}

export const getBookingThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
      const data = await response.json();
      dispatch(getBooking(data.booking)); // check postman. data.booking???
      return data.booking;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      } else {
        return ["An error occurred. Please try again."];
      }
    }
}
