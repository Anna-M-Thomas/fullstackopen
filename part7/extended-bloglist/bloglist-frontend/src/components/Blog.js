import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { setAllBlogs, addLikes, addComment } from "../reducers/blogReducer";
import Button from "@material-ui/core/Button";
import Textfield from "@material-ui/core/Textfield";

const Blog = ({ blog, showMessage }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      return;
    }
    try {
      await blogService.deleteBlog(blog.id);
      const updatedBlogs = blogs.filter((item) => item.id !== blog.id);
      dispatch(setAllBlogs(updatedBlogs));
      showMessage("Blog successfully deleted!", "success");
    } catch (error) {
      showMessage(`Could not delete blog: ${error.message}`, "error");
    }
  };

  const increaseLikes = (blogId) => {
    try {
      dispatch(addLikes(blogId));
      showMessage("Successfully added likes!", "success");
    } catch (error) {
      showMessage(`Could not add like: ${error.message}`, "error");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newComment(blog.id, comment);
    setComment("");
  };

  const newComment = (blogId, content) => {
    try {
      dispatch(addComment(blogId, content));
      showMessage("Successfully added comment!", "success");
    } catch (error) {
      showMessage(`Could not add like: ${error.message}`, "error");
    }
  };

  if (!blog) {
    return null;
  }

  const comments = blog.comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));

  return (
    <div className="blog">
      <h2>
        {blog.title} by {blog.author}{" "}
        {user.id === blog.user.id ? (
          <Button onClick={handleDelete} variant="contained" disableElevation>
            delete
          </Button>
        ) : (
          ""
        )}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      Likes: <span className="like">{blog.likes}</span>{" "}
      <Button
        onClick={() => increaseLikes(blog.id)}
        color="secondary"
        variant="contained"
        disableElevation
      >
        like
      </Button>
      <br />
      User: {blog.user ? blog.user.name : "None"}
      <br />
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <Textfield
            type="text"
            name="comment"
            id="comment"
            label="Add comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disableElevation
          >
            create
          </Button>
        </div>
      </form>
      {blog.comments.length > 0 ? <ul>{comments}</ul> : null}
    </div>
  );
};

export default Blog;
