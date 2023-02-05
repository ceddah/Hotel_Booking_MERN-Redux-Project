import { LOGIN_USER, LOGOUT } from "../constants/actions";

let userState;

if (window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  userState = null;
}

export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
