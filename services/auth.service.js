import axios from "axios";


const REACT_APP_API_URL = ''

const login = (email, password) => {
  return axios
    .post(`${REACT_APP_API_URL}/auth/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

const forgotPassword = (email) => {
  console.log("email", email);
  return axios.post(`${REACT_APP_API_URL}/auth/forgot-password`, { email });
};



const authService = {
  login,
  logout,
  forgotPassword,

};

export default authService;
