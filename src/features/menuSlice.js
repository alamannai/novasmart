import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import MenuService from '../services/menu.service'
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
async function getItem(key) {
  return await SecureStore.getItemAsync(key);
}

const user = getItem("user");
const accessToken = getItem("accessToken");

  
// Get user menu
export const getMenu = createAsyncThunk(
    'menu/getAll',
    async (lan, profil, username, pas, thunkAPI) => {
      try {
        const token = getItem("accessToken");
        const data = await MenuService.getMenu(lan, profil, username, pas, token)
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
          console.log('this is payload',action.payload)
          state.menu = action.payload
        })
        .addCase(getMenu.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })
  
  export const { reset } = menuSlice.actions
  export default menuSlice.reducer