export const messageHelper = (message, length) => {
  return async (dispatch) => {
    const timeOutId = setTimeout(() => {
      dispatch(removeMessage());
    }, length);
    dispatch(setMessage(message, timeOutId));
  };
};

export const removeMessage = () => {
  return {
    type: "REMOVE_MESSAGE",
    data: { content: "", id: "" },
  };
};

export const setMessage = (content, timeOutId) => {
  return {
    type: "SET_MESSAGE",
    data: { content, id: timeOutId },
  };
};

//If another timeOutId exists, it's before a previous timeout has ended
//So we clear the previous timeout and then replace it with the next timeoutid
const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      if (state.id === "") {
        return action.data;
      } else {
        clearTimeout(state.id);
        return action.data;
      }
    case "REMOVE_MESSAGE":
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
