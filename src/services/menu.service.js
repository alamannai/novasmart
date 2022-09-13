import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const REACT_APP_API_URL = "http://10.12.12.72:3003/api/ngsmart/Menu"
// Get user menu
const getMenu = async (lan, profil, username, pas,  token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(REACT_APP_API_URL,data=
      {"LAN":lan,
      "PROFIL":profil, 
      "ZHRU_COD":username, 
      "PAS":pas}
    ,
      config
    )

    return response

  }

  

const menuService = {
  getMenu
};

export default menuService;