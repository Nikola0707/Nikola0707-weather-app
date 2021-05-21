import React, { useState, useEffect } from "react";

import axios from "axios";

import "../style/CurrentWeather.style.css"

const CurrentWeather = () => {
  const [status, setStatus] = useState(null);
  const [pending, setPending] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [feels_like, setFeels_like] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [temp_max, setTemp_max] = useState(null);
  const [temp_min, setTemp_min] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);



  const getLocationGetWeather = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
            )
            .then((response) => {
              const main = response.data.main;
              const sys = response.data.sys;

              setWeatherData(main.weather);
              setCityName(response.data.name);
              setPressure(main.pressure);
              setHumidity(main.humidity);
              setFeels_like(main.feels_like);
              setTemp(main.temp);
              setTemp_max(main.temp_max);
              setTemp_min(main.temp_max);
              setCountryCode(sys.country);
              setSunrise(sys.sunrise);
              setSunset(sys.sunset);
              setWeatherIcon(response.data.weather[0].icon)
              setPending(false);
            });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocationGetWeather();
  }, []);

  return (
    <>
      {pending ? <h1>Loading</h1> : 
      <div className="card">
          <p>{cityName}</p>
          <div className="grid-3">
            <div className="grid-item-1">
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
              alt="weather status icon"
              className="weather-icon"
            />
            </div>
            <div className="grid-item-2">
                <p className="degree">{temp}</p>
            </div>
            <div className="grid-item-3">
                <p>Feels like: {feels_like}</p>
                <p>Max temp: {temp_max}</p>
                <p>Min temp: {temp_min}</p>
            </div>
          </div>
      </div>}
    </>
  );
};

export default CurrentWeather;
