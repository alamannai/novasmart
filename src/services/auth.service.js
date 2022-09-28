import axios from "axios";


const REACT_APP_API_URL =  'http://10.12.12.72:3003/api/ngsmart'

//JSON.parse(localStorage.getItem("uri"));




 const login =  async(username, password, uri) => {
  return await axios
    .post(uri+'/login', {
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
  localStorage.removeItem("accessToken");
};



const authService = {
  login,
  logout,
};

export default authService;
