import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const REACT_APP_API_URL = "http://10.12.12.72:3003/api/ngsmart/Menu"
// Get user menu
const getMenu = async (lan, profil, username,pas, token,uri) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(uri)
    return await axios.post(uri+'/Menu', data= {"LAN":lan, "PROFIL":profil,"ZHRU_COD":username, "PAS":pas}, config )
      .then((response) => {
        console.log('service menu', response)
        return response.data;
  });

  }

  

const menuService = {
  getMenu
};

export default menuService;