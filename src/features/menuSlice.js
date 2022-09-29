import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import MenuService from '../services/menu.service'
import * as SecureStore from 'expo-secure-store';


async function getItem(key) {
  const val = await SecureStore.getItemAsync(key);
  if (val){
    return val
  }
}

const user = getItem("user");
const accessToken = getItem("accessToken");

  
// Get user menu
export const getMenu = createAsyncThunk(
    'menu/getAll',
    async (_, thunkAPI) => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        const user = JSON.parse(localStorage.getItem("user"));
        const uri = localStorage.getItem("uri");
        console.log(user)
        const data = await MenuService.getMenu(user.LAN, user.ZHRU_USR, user.ZHRU_COD, user.SCIV_PAS, accessToken,uri)
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
    menu: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }
  


  
export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getMenu.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getMenu.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.menu = action.payload
        })
        .addCase(getMenu.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
        })
    },
  })
  
  export const { reset } = menuSlice.actions
  export default menuSlice.reducer