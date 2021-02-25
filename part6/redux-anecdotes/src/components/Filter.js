import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  };

  const changeHandler = (event) => {
    props.setFilter(event.target.value);
  };

  return (
    <div style={style}>
      <label>
        Filter:
        <input onChange={changeHandler} />
      </label>
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
