import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const changeHandler = (event) => {
    dispatch(setFilter(event.target.value));
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

export default Filter;
