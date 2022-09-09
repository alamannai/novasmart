import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const REACT_APP_API_URL = 'http://10.12.12.72:3003/api/ngsmart'



async function save(key, value) {
   await SecureStore.setItemAsync(key, value);
}

async function dlt (key) {
   await SecureStore.deleteItemAsync(key);
}




 const login =  async(username, password) => {
  return await axios
    .post(REACT_APP_API_URL+'/login', {
      'ZHRU_COD':username,
      'ZHRU_PWD':password
    })
    .then((response) => {
      if (response.data) {
        save("user", JSON.stringify([response.data.connecte]));
        save("accessToken", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};


const logout = async () => {
  dlt("user");
  dlt("accessToken");
};


const authService = {
  login,
  logout,
};

export default authService;
