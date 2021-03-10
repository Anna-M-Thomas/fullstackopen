import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../App";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  const clearAll = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.getParams()} />
        </div>
        <div>
          author
          <input {...author.getParams()} />
        </div>
        <div>
          url for more info
          <input {...info.getParams()} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={clearAll}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
