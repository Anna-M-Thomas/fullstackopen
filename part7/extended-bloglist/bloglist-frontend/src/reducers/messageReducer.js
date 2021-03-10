export const setMessage = (content, type) => {
  return {
    type: "SET_MESSAGE",
    data: { content, type },
  };
};

const messageReducer = (state = { content: null, type: null }, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { content: action.data.content, type: action.data.type };
    default:
      return state;
  }
};

export default messageReducer;
