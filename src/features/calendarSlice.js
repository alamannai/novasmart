import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CalendarService from '../services/calendar.servive'





  
// Get user ferie
export const getFer = createAsyncThunk(
    'menu/ferie',
    async ( year,thunkAPI) => {
      try {
        const startDate = year+'0101'
        const endDate =  year+'1231'
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




    
// Get user abs
export const getAbs = createAsyncThunk(
  'menu/abs',
  async (year, thunkAPI) => {
    try {
      const startDate = year+'0101'
      const endDate =  year+'1231'
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await CalendarService.getAbs(
          user.LAN,
          user.SCIV_MAT, 
          startDate, 
          endDate, 
          user.SCIV_PAS,
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
    Abs: [],
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
          //state.Abs = action.payload.Abs
        })
        .addCase(getFer.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
        })
        .addCase(getAbs.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getAbs.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          //state.Jfer = action.payload
          state.Abs = action.payload
        })
        .addCase(getAbs.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
        })
    },
  })
  
  export const { reset } = calendarSlice.actions
  export default calendarSlice.reducer