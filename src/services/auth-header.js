export default function authHeader() {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      return { "x-access-token": accessToken };
    } else {
      return {};
    }
  }
  