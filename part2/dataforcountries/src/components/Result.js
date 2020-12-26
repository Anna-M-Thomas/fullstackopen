import React, { useState } from "react";
import Country from "./Country";
import Weather from "./Weather";

const Result = ({ countries, search }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <div>Too many countries, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <>
        <Country country={country} key={country.numericCode} single={true} />
      </>
    );
  } else {
    return (
      <>
        {filteredCountries.map((country) => (
          <Country country={country} key={country.numericCode} single={false} />
        ))}
      </>
    );
  }
};

export default Result;
