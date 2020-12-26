import React from "react";
import Weather from "./Weather";

const Country = ({ country, single }) => {
  const toggleShow = (event) => {
    const div = event.target.parentNode.querySelector(
      `div[data-code="${country.numericCode}"]`
    );
    div.classList.toggle("hidden");
  };

  return (
    <>
      <h1>{country.name}</h1>
      <button data-code={country.numericCode} onClick={toggleShow}>
        show/hide
      </button>
      <div data-code={country.numericCode} className="hidden">
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={`${country.name} flag`} />
        {single ? <Weather capital={country.capital} /> : ""}
      </div>
    </>
  );
};

export default Country;
