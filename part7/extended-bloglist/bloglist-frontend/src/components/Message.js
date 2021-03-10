import React from "react";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector((state) => state.message);

  if (message.content === null) {
    return null;
  }
  return <Alert severity={message.type}>{message.content}</Alert>;
};

export default Message;
