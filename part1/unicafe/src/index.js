import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}: </td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const items = good + bad + neutral;
  const sum = good - bad;

  const average = () => sum / items;
  const percentage = () => (good / items) * 100;

  if (items) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={items} />
            <Statistic text="Average" value={average().toFixed(2)} />
            <Statistic text="% positive" value={percentage().toFixed(2)} />
          </tbody>
        </table>
      </>
    );
  } else
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback yet</p>
      </>
    );
};

const Button = ({ clickHandler, text }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div id="container">
      <h1>Give Feedback!</h1>
      <img src="./unicafe.jpg" alt="a coffee cup on a unicycle" />
      <aside>"Unicafe: you'd better hope we have good balance!"</aside>
      <br />
      <Button clickHandler={addGood} text="Good" />
      <Button clickHandler={addNeutral} text="Neutral" />
      <Button clickHandler={addBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
