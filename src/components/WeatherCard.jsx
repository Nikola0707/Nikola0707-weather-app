import moment from "moment";
import "../style/WeatherCard.style.css";

const WeatherCard = ({
  weatherIcon,
  temp,
  city,
  country,
  weatherDescription,
  dateTime,
}) => {
  return (
    <div className="container">
      <div className="icon">
        <img
          src={`http://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
          alt="weather status icon"
          className="weather-icon"
        />
      </div>
      <div className="grid-2">
        <div className="grid-item-background-dark-radius-left display-flex">
          <p className="degree degree-30">{Math.floor(temp)}&#8451;</p>
          <div>
            <p className="mb-0 text-20">{weatherDescription}</p>
            <p>
              {city}, {country}
            </p>
          </div>
        </div>
        <div className="display-flex grid-item-background-light-radius-right">
          <p>{moment.unix(dateTime).format("llll")}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
