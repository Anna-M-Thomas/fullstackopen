import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { messageHelper } from "../reducers/notificationReducer";

const Anecdoteform = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createAnecdote(content);
    props.messageHelper(`Submitted anecdote ${content}`, 5000);
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

export default connect(null, { createAnecdote, messageHelper })(Anecdoteform);
