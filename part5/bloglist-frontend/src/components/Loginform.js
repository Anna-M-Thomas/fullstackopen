import React from "react";
import PropTypes from "prop-types";

const Loginform = ({
  password,
  setPassword,
  username,
  setUsername,
  handleLogin,
}) => (
  <form onSubmit={handleLogin} className="loginForm">
    <div>
      <label>
        Username
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
    </div>
    <button>login</button>
  </form>
);

Loginform.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Loginform;
