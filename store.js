import { configureStore } from '@reduxjs/toolkit'
import authReducer from './src/features/authSlice'
import menuReducer from './src/features/menuSlice'
import calendarReducer from './src/features/calendarSlice'




export const store = configureStore({
    reducer: {
      auth: authReducer,
      menu: menuReducer,
      calendar: calendarReducer
    },
})