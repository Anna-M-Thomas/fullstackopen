import React from "react";
import { connect } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { messageHelper } from "../reducers/notificationReducer";

import Filter from "./Filter";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const Anecdotelist = (props) => {
  const vote = ({ id, content, votes }) => {
    console.log("called");
    const newVotes = votes + 1;
    props.updateAnecdote(id, newVotes);
    props.messageHelper(`You voted for "${content}"`, 5000);
  };

  return (
    <>
      <Filter />
      {props.anecdotes
        .filter((item) =>
          item.content.toLowerCase().includes(props.filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { updateAnecdote, messageHelper })(
  Anecdotelist
);
