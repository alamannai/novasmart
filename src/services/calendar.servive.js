import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const REACT_APP_API_URL = "http://10.12.12.72:3003/api/ngsmart"
// Get user ferie
const getFerie = async (lan,mat, startDate,endDate, username,pas,prg, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return await axios.post(REACT_APP_API_URL+ '/GetSJFEMat', 
    data= {
        "SABD_LAN":lan,
        "SABD_MAT":mat,
         "IDU":username, 
         "DATE_DEB":startDate,
         "DATE_FIN":endDate,
         "SABD_PAS":pas,
         "PRG":prg
        }, config )
      .then((response) => {
        return response.data;
  });

  }


  const getAbs = async (lan,mat, startDate,endDate,pas, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return await axios.post(REACT_APP_API_URL+ '/GetAbsenceEmp', 
    data= {
        "SABD_LAN":lan,
        "SABD_MAT":mat,
         "DATE_DEB":startDate,
         "DATE_FIN":endDate,
         "SABD_PAS":pas,
        }, config )
      .then((response) => {
        return response.data;
  });

  }

  

const calendarService = {
    getFerie,
    getAbs
};

export default calendarService;