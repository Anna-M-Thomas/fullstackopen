import React from "react";

const Message = ({ message }) => {
  if (message.content === null) {
    return null;
  }
  return <div className={`message ${message.type}`}>{message.content}</div>;
};

export default Message;
