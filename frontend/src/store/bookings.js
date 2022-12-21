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
        dispatch(loadBookings(data.Bookings))
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
      dispatch(getBooking(data.bookings)); // check postman. data.booking???
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

export const addBookingThunk = (spotId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(booking)
    })

    if (response.ok) {
      const data = await response.json();
      dispatch(addBooking(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

export const updateBookingThunk = (bookingId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(booking)
    })

    if (response.ok) {
      const data = await response.json();
    //   if (data.errors) {
    //     return data;
    //   }                 PUT IN IF ADDING ERRORS ON BACKEND
      dispatch(addBooking(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

export const removeBookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })

    if (response.ok) {
      await dispatch(removeBooking(bookingId));
      return;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

// REDUCER 
const initialState = { allBookings: {}, currentBooking: {} };
export default function BookingReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKINGS:
      const allBookings = normalizeArray(action.bookings);
      return { ...state, allBookings: { ...allBookings } };
    case GET_BOOKING:
      const currentBooking = {
        allBookings: { ...state.allBookings },
        currentBooking: { ...action.booking.bookings },
      };
      return currentBooking;
    case ADD_BOOKING:
      if (!state[action.booking.id]) {
        const newState = {
          ...state,
          allBookings: {
            ...state.allBookings,
            [action.booking.id]: action.booking,
          },
        };
        return newState;
      }
      return {
        ...state,
        allBookings: {
          ...state.allBookings,
          [action.booking.id]: {
            ...state[action.booking.id],
            ...action.booking,
          },
        },
      };
    case REMOVE_BOOKING:
      const deleteState = { ...state };
      delete deleteState.allBookings[action.bookingId];
      return deleteState;
    default:
      return state;
  }
}
//HELPERS
function normalizeArray(dataArray) {
  if (!dataArray instanceof Array)
    throw new Error("Normalize problem: data invalid");
  const obj = {};
  dataArray.forEach((element) => {
    obj[element.id] = element;
  });
  return obj;
}
