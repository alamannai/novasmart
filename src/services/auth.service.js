import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const REACT_APP_API_URL = 'http://10.12.12.72:3003/api/ngsmart'



 function save(key, value) {
  const val =  SecureStore.setItemAsync(key, value);
  if (val){
    return val
  }
}

async function dlt (key) {
   await SecureStore.deleteItemAsync(key);
}


 const login =  async(username, password) => {
  return await axios
    .post(REACT_APP_API_URL+'/login', {
      "ZHRU_COD":username,
      "ZHRU_PWD":password
    })
    .then((response) => {
        console.log('saving token',response.data.token)
        if(response.data.connecte){
          localStorage.setItem("user", JSON.stringify(response.data.connecte));
          localStorage.setItem("accessToken",JSON.stringify(response.data.token)
          );
          return response.data;
        }else{
          console.log('invalide ,from service',response.data)
          return response.data;
        }
    })
};


const logout = () => {
  localStorage.removeItem("user");
};



const authService = {
  login,
  logout,
};

export default authService;
