import React from "react";
import Button from "@material-ui/core/Button";

const Togglable = ({
  children,
  openButtonLabel,
  closeButtonLabel,
  visible,
  setVisible,
}) => {
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          color="secondary"
          variant="contained"
          disableElevation
        >
          {openButtonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          onClick={toggleVisibility}
          color="secondary"
          variant="contained"
          disableElevation
        >
          {closeButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
