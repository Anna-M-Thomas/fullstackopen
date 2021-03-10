import blogService from "../services/blogs";
import loginService from "../services/login";

export const setUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export const clearUser = () => {
  window.localStorage.setItem("loggedInUser", JSON.stringify(null));
  return {
    type: "CLEAR_USER",
    data: null,
  };
};

const savedUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

const userReducer = (state = savedUser || null, action) => {
  switch (action.type) {
    case "SET_USER":
    case "CLEAR_USER":
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
