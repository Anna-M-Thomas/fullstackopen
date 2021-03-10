import React from "react";

const Anecdote = ({ anecdote }) => {
  return (
    <div className="anecdote">
      {anecdote.content}
      <br />
      by {anecdote.author}. Votes: {anecdote.votes}
      <br />
      <a href={anecdote.info}>Link</a>
    </div>
  );
};

export default Anecdote;
