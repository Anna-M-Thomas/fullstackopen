import React, { useState } from "react";
import { setUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";

const Loginform = ({ showMessage }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(setUser(username, password));
      showMessage(`${username} successfully logged in!`);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showMessage(`Login unsuccessful: ${exception}`, "error");
    }
  };

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        <Textfield
          type="text"
          id="username"
          name="username"
          value={username}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <Textfield
          type="password"
          name="password"
          id="password"
          value={password}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit">login</Button>
    </form>
  );
};

export default Loginform;
