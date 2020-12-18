import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const getRandom = () => Math.floor(Math.random() * anecdotes.length);
  const getWinner = () => {
    let winningScore = 0;
    let winnerIndex = 0;
    for (let i = 0; i < vote.length; i++) {
      if (vote[i] > winningScore) {
        winningScore = vote[i];
        winnerIndex = i;
      }
    }
    return { winnerIndex, winningScore };
  };

  const clickHandler = () => {
    setSelected(getRandom());
  };

  const voteHandler = () => {
    const newArray = [...vote];
    newArray[selected] += 1;
    setVote(newArray);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <button onClick={clickHandler}>Get next anecdote</button>
      <button onClick={voteHandler}>Vote for this anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>Quote:{props.anecdotes[getWinner().winnerIndex]}</div>
      <div>Number of votes:{getWinner().winningScore}</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
