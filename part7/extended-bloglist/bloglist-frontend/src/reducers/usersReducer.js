import usersService from "../services/users";

export const setAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "SET_ALL_USERS",
      data: users,
    });
  };
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_USERS":
      return action.data;
    default:
      return state;
  }
};

export default usersReducer;
