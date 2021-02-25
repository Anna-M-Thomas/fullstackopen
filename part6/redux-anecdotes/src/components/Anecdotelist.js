import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

const Anecdotelist = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = ({ id, content, votes }) => {
    const newVotes = votes + 1;
    dispatch(updateAnecdote(id, newVotes));
    dispatch(messageHelper(`You voted for "${content}"`, 5000));
  };

  return (
    <>
      <Filter />
      {anecdotes
        .filter((item) => item.content.includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
        ))}
    </>
  );
};

export default Anecdotelist;
