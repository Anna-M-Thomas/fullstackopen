import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [temp, changeTemp] = useState({});
  const [weather, changeWeather] = useState({});

  function convertTemp(kelvin) {
    const celsius = (kelvin - 273.15).toFixed(1);
    const fahrenheit = (kelvin * 1.8 - 459.67).toFixed(1);
    return { C: celsius, F: fahrenheit };
  }

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((result) => {
        console.log(result.data);
        changeTemp(result.data.main.temp);
        changeWeather(result.data.weather[0]);
      });
  }, []);

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature {convertTemp(temp).C} degrees C</p>
      <img
        className="weather"
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
      />
      <p>Weather: {weather.description}</p>
    </>
  );
};

export default Weather;

/*<p>{convertTemp(weather.main.temp).C} degrees C</p>
        <p>{convertTemp(weather.main.temp).F} degrees F</p>*/
