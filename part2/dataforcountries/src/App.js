import React, { useState, useEffect } from "react";
import Result from "./components/Result";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div>
        Find countries
        <input value={search} onChange={changeHandler} />
        <Result search={search} countries={countries} />
      </div>
    </>
  );
};

export default App;
