import axios from "axios"

const API_URL = "http://localhost:8000/api/"

class Authservice {

  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.response) {
          localStorage.setItem("user", JSON.stringify(response.data.response));
          localStorage.setItem("token", JSON.stringify(response.data.response?.token));
        }
        return response.data.response
      })
  }

  logout() {
    localStorage.removeItem("user");
  }

  signup(username, email, password, confirm_password) {
    return axios.post(API_URL + "register", { username, email, password, confirm_password })
  }
}

export default Authservice;