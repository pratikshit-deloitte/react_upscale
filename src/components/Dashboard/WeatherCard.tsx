import React from "react";
import { WeatherData } from "../weatherTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import warn from "../../assets/warning.png";
import degree from "../../assets/degree.png";
import "./WeatherCard.css";
import { Link } from "react-router-dom";
interface WeatherCardProps {
  data: WeatherData;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const temperatureInCelsius = Math.round(data.main.temp - 273.15);
  const imgUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={`/weather-details/${data.name}`}
    >
      <div className="weather-card">
        <div className="card">
          <div className="card-header">
            <p>{data.name}</p>
            <FontAwesomeIcon icon={faGreaterThan} />
          </div>
          <div className="card-section">
            <div className="temp">
              <p>{temperatureInCelsius}</p>
              <img src={degree} alt="degree" />
            </div>
            <img src={imgUrl} alt={data.weather[0].description}></img>
          </div>
          <div className="card-footer">
            <div className="warning">
              <img src={warn} alt="warning" />
              <p>Warning</p>
            </div>
            <p>Expecting {data.weather[0].main}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WeatherCard;
