import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMessage, removeMessage } from "./reducers/notificationReducer";
//import { createAnecdote } from "./reducers/anecdoteReducer";
import { initializeAll } from "./reducers/anecdoteReducer";
import Anecdoteform from "./components/Anecdoteform";
import Anecdotelist from "./components/Anecdotelist";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAll());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Anecdotelist />
      <Anecdoteform />
    </div>
  );
};

export default App;
