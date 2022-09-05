import axios from "axios";


const REACT_APP_API_URL = ''

const createBooking = async (bookingData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(REACT_APP_API_URL, bookingData, config)
  
    return response.data
  }

// Get user bookings
const getBookings = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(REACT_APP_API_URL, config)
  
    return response.data
  }

// Delete user Booking
const deleteBooking = async (bookingId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(REACT_APP_API_URL + bookingId, config)
  
    return response.data
  }
  

const bookingService = {
    createBooking,
  getBookings,
  deleteBooking,

};

export default bookingService;