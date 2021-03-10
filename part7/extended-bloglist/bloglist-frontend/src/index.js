import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import App from "./App";
import "./index.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#82e9de",
      main: "#4db6ac",
      dark: "#00867d",
      contrastText: "#000",
    },
    secondary: {
      light: "#ffffee",
      main: "#ffccbc",
      dark: "#cb9b8c",
      contrastText: "#000",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "5px",
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
