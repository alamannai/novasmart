import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthService from "./services/auth.service";



const user = JSON.parse(localStorage.getItem("user"));

const accessToken = JSON.parse(localStorage.getItem("accessToken"));



export const login = createAsyncThunk(

  "auth/login",

  async ({ email, password }, thunkAPI) => {

    console.log("email, password", email, password);

    try {

      const data = await AuthService.login(email, password);

      const { user, accessToken } = data;

      return { user, accessToken };

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


export const verifyOpt = createAsyncThunk(

  "auth/verify-opt",

  async ({ email, opt }, thunkAPI) => {

    try {

      const data = await AuthService.verifyOpt(email, opt);

      return data;

    } catch (error) {

      console.log("error.response.data.message", error.response.data.message);

      const message =

        (error.response &&

          error.response.data &&

          error.response.data.message) ||

        error.message ||

        error.toString();

      console.log("message", message);


      // thunkAPI.dispatch();

      return thunkAPI.rejectWithValue(message);

    }

  }

);


export const logout = createAsyncThunk("auth/logout", async () => {

  await AuthService.logout();

});




export const forgotPassword = createAsyncThunk(

  "auth/forgotPassword",

  async ({ email }, thunkAPI) => {

    try {

      const data = await AuthService.forgotPassword(email);

      return data;

    } catch (error) {

      console.log("error.response.data.message", error.response.data.message);

      const message =

        (error.response &&

          error.response.data &&

          error.response.data.message) ||

        error.message ||

        error.toString();

      console.log("message", message);


      // thunkAPI.dispatch();

      return thunkAPI.rejectWithValue(message);

    }

  }

);




const initialState = user

  ? {

      isLoggedIn: true,

      userInfo: user,

      error: null,

      accessToken,

      loading: false,

    }

  : {

      isLoggedIn: false,

      userInfo: null,

      error: null,

      accessToken: null,

      loading: false,

    };


console.log("initialState", initialState);


const authSlice = createSlice({

  name: "auth",

  initialState,

  extraReducers: {


    [login.pending]: (state, action) => {

      state.isLoggedIn = false;

      state.error = null;

    },

    [login.fulfilled]: (state, action) => {

      console.log("fulfilled user", JSON.stringify(action.payload.user));

      console.log(

        "fulfilled accessToken",

        JSON.stringify(action.payload.accessToken)

      );

      state.isLoggedIn = true;

      state.userInfo = action.payload.user;

      state.accessToken = action.payload.accessToken;

      state.loading = false;

    },

    [login.rejected]: (state, action) => {

      state.isLoggedIn = false;

      state.user = null;

      state.user = null;

    },

    [logout.fulfilled]: (state, action) => {

      state.isLoggedIn = false;

      state.user = null;

    },

    [forgotPassword.fulfilled]: (state, action) => {

      state.isLoggedIn = false;

    },

    [forgotPassword.rejected]: (state, action) => {

      state.isLoggedIn = false;

    },

  },

});


const { reducer } = authSlice;

export default reducer;
