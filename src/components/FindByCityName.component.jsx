import React, { useState } from "react";
import "../style/FindByCityName.style.css";
import SearchCity from "./SearchCity";
import WeatherCard from "./WeatherCard";

const FindByCityName = () => {
  const [newSearch, setNewSearch] = useState(false);
  const [city, setCity] = useState(null);
  const [pending, setPending] = useState(true);
  const [temp, setTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [country, setCountry] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const getInput = (e) => {
    const { name, value } = e.target;
    if (name === "searchCity") {
      setCity(value);
    }
  };

  const getWeatherData = () => {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          const { temp } = data.main;
          const { icon, description } = data.weather[0];
          const { country } = data.sys;

          setCountry(country);
          setDateTime(data.dt);
          setTemp(temp);
          setWeatherIcon(icon);
          setWeatherDescription(description);
          setPending(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onClickHandler = () => {
    getWeatherData();
    setNewSearch(false);
  };
  return (
    <>
      {pending ? (
        <SearchCity getInput={getInput} onClickHandler={onClickHandler} />
      ) : (
        <>
          {newSearch ? (
            <SearchCity getInput={getInput} onClickHandler={onClickHandler} />
          ) : (
            <>
              <i className="fas fa-arrow-circle-left arrow-positioning" onClick={() => setNewSearch(true)}></i>
              <WeatherCard
                weatherIcon={weatherIcon}
                temp={temp}
                city={city}
                country={country}
                dateTime={dateTime}
                weatherDescription={weatherDescription.toUpperCase()}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default FindByCityName;
