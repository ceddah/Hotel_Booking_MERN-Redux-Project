import axios from "axios";

export const register = async (userdata) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, userdata);

export const login = async (userdata) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, userdata);

export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
