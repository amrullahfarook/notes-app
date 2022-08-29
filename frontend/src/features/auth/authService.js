import axios from "axios";

const API_URL = "/api/users/";

//Register User
const register = async (userData) => {
  const response = await axios.put(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Update user
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + userData._id, userData, config);

  return response.data;
};

//Logout User
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  updateUser,
};

export default authService;
