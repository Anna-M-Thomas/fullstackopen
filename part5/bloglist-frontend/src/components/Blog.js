import React from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

const Blog = ({ user, blog, blogs, setBlogs, showMessage, increaseLikes }) => {
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      return;
    }
    try {
      await blogService.deleteBlog(blog.id);
      const updatedBlogs = blogs.filter((item) => item.id !== blog.id);
      setBlogs(updatedBlogs);
      showMessage("Blog successfully deleted!", "success");
    } catch (error) {
      showMessage(`Could not delete blog: ${error.message}`, "alert");
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}{" "}
      {user.id === blog.user.id ? (
        <button onClick={handleDelete}>delete</button>
      ) : (
        ""
      )}
      <Togglable openButtonLabel="view details" closeButtonLabel="close">
        <div className="details">
          URL:{blog.url}
          <br />
          Likes: <span className="like">{blog.likes}</span>{" "}
          <button onClick={() => increaseLikes(blog.id)}>like</button>
          <br />
          User: {blog.user ? blog.user.name : "None"}
          <br />
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
