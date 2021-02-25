import anecdoteHandler from "../services/anecdotes";

export const updateAnecdote = (id, votes) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteHandler.updateVotes(id, votes);
    dispatch({
      type: "UPDATE_ANECDOTE",
      data: updatedAnecdote,
    });
  };
};

export const initializeAll = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteHandler.getAll();
    dispatch({
      type: "INITIALIZE_ALL",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const addedAnecdote = await anecdoteHandler.addNew(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data: addedAnecdote,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "INITIALIZE_ALL":
      return action.data;
    case "ADD_ANECDOTE":
      return [...state, action.data];
    //fix this
    case "UPDATE_ANECDOTE":
      const id = action.data.id;
      const newAnecdote = action.data;
      return state.map((item) => (item.id === id ? newAnecdote : item));
    default:
      return state;
  }
};

export default anecdoteReducer;
