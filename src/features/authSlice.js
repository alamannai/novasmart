import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  AsyncStorage  from 'react-native';
import AuthService from "../services/auth.service";
import React, { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

async function getItem(key) {
  return await SecureStore.getItemAsync(key);
}

const user = getItem("user");
const accessToken = getItem("accessToken");



export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    console.log("username, password", username, password);
    try {
      console.log("success")
      return await AuthService.login(username, password);

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("message", message);

      return thunkAPI.rejectWithValue(message);

    }
  }
);




export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});


const initialState =  {
      isLoggedIn: false,
      userInfo:  [],
      error: false,
      accessToken:  '',
      loading: false,
      success: false
    };
 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = false
      state.userInfo = []
      state.accessToken = ''
      state.loading= false
      state.success= false
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true
    })

    .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.error = true

        state.userInfo = action.payload.connecte
        state.accessToken = action.payload.tokens;
      })

    .addCase(login.rejected, (state, action) => {
        state.loading = false
        //state.error = true
      })

      .addCase(logout.fulfilled, (state) => {
        state.userInfo = []
        state.accessToken = ''
      })

  }

});


const { reducer } = authSlice;

export default reducer;
