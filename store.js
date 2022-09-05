import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import bookingReducer from './features/bookingSlice'

export const store = configureStore({
  reducer: {
    reducer: {
      auth: authReducer,
      bookings: bookingReducer,
    },
  },
})