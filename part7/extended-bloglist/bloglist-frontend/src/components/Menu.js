import React from "react";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/Appbar";
import Button from "@material-ui/core/Button";

const Menu = ({ name, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <span>
          {name} logged in <Button onClick={handleLogout}>logout</Button>
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
