import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List>
        {user.blogs.map((blog) => (
          <ListItem>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>users</h2>
      <h3>blogs created</h3>
      <List>
        {users.map((user) => (
          <ListItem component={Link} to={`/users/${user.id}`}>
            <ListItemText primary={`${user.name} ${user.blogs.length}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Users;

/* <div>
<h2>users</h2>
<table>
  <thead>
    <tr>
      <th></th>
      <th>blogs created</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    ))}
  </tbody>
</table>
</div> */
