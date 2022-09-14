import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CalendarService from '../services/calendar.servive'





  
// Get user ferie
export const getFer = createAsyncThunk(
    'menu/ferie',
    async (month , thunkAPI) => {
      try {
        const startDate = '2022'+ month +'01'
        const endDate = '2022'+ month +'31'
        const prg = 'CALENDAR'
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        const user = JSON.parse(localStorage.getItem("user"));
        const data = await CalendarService.getFerie(
            user.LAN,
            user.SCIV_MAT, 
            startDate, 
            endDate, 
            user.ZHRU_COD, 
            user.SCIV_PAS,
            prg,
            accessToken
        )

        return data
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return error
      }
    }
  )



  const initialState = {
    Jfer: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }
  


  
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getFer.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getFer.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.Jfer = action.payload
        })
        .addCase(getFer.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
        })
    },
  })
  
  export const { reset } = calendarSlice.actions
  export default calendarSlice.reducer