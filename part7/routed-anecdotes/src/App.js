import React, { useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  const getParams = () => {
    return { type, value, onChange };
  };

  return { type, value, onChange, reset, getParams };
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setTimeout(() => {
      setNotification(null);
    }, 10000);
    setNotification(message);
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    showNotification(`You added ${anecdote.content}`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const match = useRouteMatch("/anecdotes/:id");
  const anecdoteToDisplay = match
    ? anecdoteById(String(match.params.id))
    : null;

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Switch>
        <Route path="/anecdotes/:id">
          {anecdoteToDisplay ? (
            <Anecdote anecdote={anecdoteToDisplay} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
