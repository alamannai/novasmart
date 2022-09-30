import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



  const initialState = {
    uri: '',
    lang:'E',
    isSuccess: false,
    isLoading: false,
    message: '',
  }
  


  
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addURI : (state,{payload}) => {
            const uri =  payload.uri;
            console.log("uri",uri)
            localStorage.setItem("uri", uri);
            state.uri = uri;
        },
        modLan : (state,{payload}) => {
            const l =  payload.lan;
            localStorage.setItem("lan", l);
            state.lang = l;
        },
        reset: (state) => initialState,
    },
  })
  
  export const { reset, addURI, modLan } = appSlice.actions
  export default appSlice.reducer