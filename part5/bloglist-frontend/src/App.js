import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Loginform from "./components/Loginform";
import Blogform from "./components/Blogform";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const savedUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  const [user, setUser] = useState(savedUser || null);
  //type can be "alert" or "success"
  const [message, setMessage] = useState({
    content: null,
    type: null,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, []);

  const showMessage = (content, type = "success") => {
    setMessage({ content, type });
    setTimeout(() => {
      setMessage({ content: null, type: null });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      showMessage(`${user.name} successfully logged in!`);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showMessage(`Login unsuccessful: ${exception}`, "alert");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.setItem("loggedInUser", JSON.stringify(null));
  };

  const increaseLikes = async (blogId) => {
    try {
      const updatedBlog = await blogService.increaseLikes(blogId);
      const updatedBlogs = blogs.map((item) =>
        item.id === updatedBlog.id ? updatedBlog : item
      );
      setBlogs(updatedBlogs);
      showMessage("Successfully added likes!", "success");
    } catch (error) {
      showMessage(`Could not add like: ${error.message}`, "alert");
    }
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = blog;
      const addedBlog = await blogService.addBlog(newBlog);
      setBlogs(blogs.concat(addedBlog));
      showMessage(`A new blog ${newBlog.title} successfully added!`, "success");
    } catch (error) {
      showMessage(`Couldn't add blog: ${error}`, "alert");
    }
  };

  if (user === null) {
    return (
      <>
        <h2>Login in to application</h2>
        <Message message={message} />
        <Loginform
          password={password}
          setPassword={setPassword}
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable openButtonLabel="add blog" closeButtonLabel="close">
        <Blogform createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            showMessage={showMessage}
            increaseLikes={increaseLikes}
          />
        ))}
    </div>
  );
};
export default App;
