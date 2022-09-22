import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import * as SecureStore from 'expo-secure-store';

async function getItem(key) {
  return await SecureStore.getItemAsync(key);
}

const user = getItem("user");
const accessToken = getItem("accessToken");




export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      if(data.connecte){
        const { connecte, token } = data;
        return { connecte, token };
      }else{
        const err  = data.Status;
        console.log('slice',err)
        return err
      }
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




export const logout = createAsyncThunk("auth/logout",  () => {
   AuthService.logout();
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
      state.isLoggedIn = false
      state.error = false
      state.userInfo = null
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
        if(action.payload.connecte){
          state.isLoggedIn = true
          state.userInfo = action.payload.connecte
          state.accessToken = action.payload.token;
        }
        
      })

    .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })

    .addCase(logout.fulfilled, (state) => {
      state.userInfo = []
      state.accessToken = ''
      state.isLoggedIn = false
    })

  }

});


const { reducer } = authSlice;

export default reducer;
