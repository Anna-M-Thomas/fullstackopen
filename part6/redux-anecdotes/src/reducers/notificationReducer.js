export const messageHelper = (message, length) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(removeMessage());
    }, length);
    dispatch(setMessage(message));
  };
};
export const removeMessage = () => {
  return {
    type: "REMOVE_MESSAGE",
    data: "",
  };
};

export const setMessage = (content) => {
  return {
    type: "SET_MESSAGE",
    data: content,
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_MESSAGE":
    case "REMOVE_MESSAGE":
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
