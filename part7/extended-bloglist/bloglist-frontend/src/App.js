import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//styling
import Container from "@material-ui/core/Container";

//reducers
import { setMessage } from "./reducers/messageReducer";
import { setAllBlogs } from "./reducers/blogReducer";
import { clearUser } from "./reducers/userReducer";
import { setAllUsers } from "./reducers/usersReducer";

//components
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Loginform from "./components/Loginform";
import Message from "./components/Message";
import Users from "./components/Users";
import { User } from "./components/Users";
import Menu from "./components/Menu";

//services
import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(setAllBlogs());
    dispatch(setAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, []);

  const match = useRouteMatch("/users/:id");
  const matchUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const match2 = useRouteMatch("/blogs/:id");
  const matchBlog = match2
    ? blogs.find((blog) => blog.id === match2.params.id)
    : null;

  const showMessage = (content, type = "success") => {
    dispatch(setMessage(content, type));
    setTimeout(() => {
      dispatch(setMessage(null, null));
    }, 5000);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  if (user === null) {
    return (
      <Container>
        <h2>Login in to application</h2>
        <Message />
        <Loginform showMessage={showMessage} />
      </Container>
    );
  }

  return (
    <Container>
      <Menu name={user.name} handleLogout={handleLogout} />
      <Message />
      <Switch>
        <Route path="/users/:id">
          {matchUser ? <User user={matchUser} /> : <Redirect to="/users" />}
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          {matchBlog ? (
            <Blog blog={matchBlog} showMessage={showMessage} />
          ) : (
            <Redirect to="/blogs" />
          )}
        </Route>
        <Route path="/blogs">
          <Blogs showMessage={showMessage} />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;

// {blogs
//   .sort((a, b) => b.likes - a.likes)
//   .map((blog) => (
//     <Blog
//       key={blog.id}
//       blog={blog}
//       showMessage={showMessage}
//       increaseLikes={increaseLikes}
//     />
//   ))}
