import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.component";

import Map from "../components/Map.component";


import "../style/CurrentWeather.style.css";
import "../style/LoadingSpinner.style.css";

const CurrentWeather = () => {
  const [status, setStatus] = useState(null);

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [pending, setPending] = useState(true);
  const [cityName, setCityName] = useState(null);
  const [feels_like, setFeels_like] = useState(null);
  const [temp, setTemp] = useState(null);
  const [temp_max, setTemp_max] = useState(null);
  const [temp_min, setTemp_min] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const [dailyData, setDailyData] = useState([]);

  const getLocationGetWeather = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //Get current location weather data
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
            )
            .then((response) => {
              setLat(position.coords.latitude);
              setLon(position.coords.longitude);

              const main = response.data.main;
              const sys = response.data.sys;

              setCityName(response.data.name);
              setFeels_like(main.feels_like);
              setTemp(main.temp);
              setTemp_max(main.temp_max);
              setTemp_min(main.temp_max);
              setCountryCode(sys.country);
              setWeatherIcon(response.data.weather[0].icon);
              
              // Get current location 7 days weather data
              axios
                .get(
                  `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`
                )
                .then((response) => {
                  setDailyData(response.data.daily);
                })
                .catch((error) => {
                  console.log(error);
                });
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
      {pending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="card">
            <p className="title">
              {cityName} {countryCode}
            </p>
            <div className="grid-3">
              <div className="grid-item-1">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
                  alt="weather status icon"
                  className="weather-icon"
                />
              </div>
              <div className="grid-item-2">
                <p className="degree">{Math.floor(temp)}&#8451;</p>
              </div>
              <div className="grid-item-3">
                <p>Feels like: {Math.floor(feels_like)}&#8451;</p>
                <p>Max temp: {Math.floor(temp_max)}&#8451;</p>
                <p>Min temp: {Math.floor(temp_min)}&#8451;</p>
              </div>
            </div>
            <div className="grid-7">
              {dailyData.slice(1).map((data, index) => (
                <div key={index}>
                  <p>
                    {
                      // MomentJS
                      moment.unix(data.dt).format("DD/MM/YYYY")
                    }
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="weather status icon"
                    className="weather-icon"
                  />
                  <p>{Math.floor(data.temp.day)}&#8451;</p>
                </div>
              ))}
            </div>
          </div>
          <Map lat={lat} long={lon}/>
        </>
      )}
    </>
  );
};

export default CurrentWeather;
