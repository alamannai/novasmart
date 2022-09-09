/*import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userAuth: null,
    confirmation: false,
  },
  reducers: {
    login: (state, { payload }) => {
      state.userAuth = payload;
    },
    logout: (state) => {
      state.userAuth = null;
    },
    isConfirmation: (state, { payload }) => {
      state.confirmation = payload;
    },
  },
});

export const { login, logout, isConfirmation } = userSlice.actions;

// selectors
export const selectUser = (state) => state.userInfo.userAuth;
export default userSlice.reducer;*/