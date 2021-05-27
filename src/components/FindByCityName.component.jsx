import React, { useState } from "react";
import "../style/FindByCityName.style.css";
import SearchCity from "./SearchCity";
import WeatherCard from "./WeatherCard";

import Map from "../components/Map.component";

const FindByCityName = () => {
  const [newSearch, setNewSearch] = useState(false);
  const [city, setCity] = useState(null);
  const [incorectCity, setIncorectCity] = useState(false);
  const [pending, setPending] = useState(true);
  const [temp, setTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [country, setCountry] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

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
          console.log(data.coord);
          if (data.main === undefined) {
            return setIncorectCity(true);
          }
          const { temp } = data.main;
          const { icon, description } = data.weather[0];
          const { country } = data.sys;
          const { lat, lon } = data.coord;

          setCountry(country);
          setDateTime(data.dt);
          setTemp(temp);
          setWeatherIcon(icon);
          setWeatherDescription(description);
          setLat(lat);
          setLon(lon);
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
      {incorectCity ? (
        <a className="goBack" href="/search">
          <i className="fas fa-arrow-circle-left arrow-back ">
            {" "}
            Please go back, you choose wrong city!
          </i>
        </a>
      ) : pending ? (
        <SearchCity getInput={getInput} onClickHandler={onClickHandler} />
      ) : (
        <>
          {newSearch ? (
            <SearchCity getInput={getInput} onClickHandler={onClickHandler} />
          ) : (
            <div className="grid-weather-card-map">
              <i
                className="fas fa-arrow-circle-left arrow-positioning"
                onClick={() => setNewSearch(true)}
              ></i>
              <WeatherCard
                weatherIcon={weatherIcon}
                temp={temp}
                city={city}
                country={country}
                dateTime={dateTime}
                weatherDescription={weatherDescription.toUpperCase()}
              />
              <Map lat={lat} long={lon} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FindByCityName;
