import React, { useState } from "react";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";

const Blogform = ({ createBlog, setVisible }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    createBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
    setVisible(false);
  };

  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <Textfield
          type="text"
          name="title"
          id="title"
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <Textfield
          type="text"
          name="author"
          id="author"
          value={author}
          label="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <Textfield
          type="text"
          name="URL"
          id="url"
          value={url}
          label="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        disableElevation
      >
        create
      </Button>
    </form>
  );
};

export default Blogform;
