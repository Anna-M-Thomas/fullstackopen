import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addBlog } from "../reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";
import Blogform from "./Blogform";
import Togglable from "./Togglable";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Blogs = ({ showMessage }) => {
  const [visible, setVisible] = useState(false);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const createBlog = (blog) => {
    try {
      dispatch(addBlog(blog));
      showMessage(`A new blog ${blog.title} successfully added!`, "success");
    } catch (error) {
      showMessage(`Couldn't add blog: ${error}`, "error");
    }
  };

  const blogList = blogs.map((blog) => (
    <ListItem component={Link} to={`/blogs/${blog.id}`}>
      <ListItemText primary={blog.title} />
    </ListItem>
  ));

  return (
    <>
      <h2>blogs</h2>
      <Togglable
        openButtonLabel="add blog"
        closeButtonLabel="close"
        visible={visible}
        setVisible={setVisible}
      >
        <Blogform createBlog={createBlog} setVisible={setVisible} />
      </Togglable>
      <List>{blogList}</List>
    </>
  );
};

export default Blogs;
