import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { messageHelper } from "../reducers/notificationReducer";

const Anecdoteform = () => {
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(messageHelper(`Submitted anecdote ${content}`, 5000));
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default Anecdoteform;
