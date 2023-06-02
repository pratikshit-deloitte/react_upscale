import React, { useEffect, useState } from "react";
import "./WeatherDetails.css";
import { WeatherData } from "../weatherTypes";
import { useParams } from "react-router-dom";
import axios from "axios";
import vector from "../../assets/Vector.png";
import degree from "../../assets/degree.png";
import { useDispatch } from "react-redux";
import { addCityName } from "../Redux/weatherSlice";
import AddToList from "./AddToList";

import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);
const WeatherDetails: React.FC<{ name: string }> = ({ name }) => {
  const { name } = useParams<{ name?: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const dispatch = useDispatch();
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [lengthOfDay, setLengthOfDay] = useState("");

  const [daylightRemaining, setDaylightRemaining] = useState("");
  const [rainPercentage, setRainPercentage] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  console.log(weatherData);
  const fetchWeatherData = async (cityId: String) => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=f5427a0f5207b76cb82078bf8d15c9cb`
      );
      

      setWeatherData(response.data);
      
      setSunrise(response.data.sys.sunrise);

      setSunset(response.data.sys.sunset);
      //console.log(response.data);

      if (response.data.rain && response.data.rain["1h"]) {
        setRainPercentage(response.data.rain["1h"] * 10);
      } else {
        setRainPercentage(0);
      }

      if (response.data.timezone) {
        const currentTimezoneOffset = new Date().getTimezoneOffset() * 60;
        const cityTimezoneOffset = response.data.timezone;

        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        const cityTimestamp =
          currentTimestamp + currentTimezoneOffset + cityTimezoneOffset;

        const cityTime = new Date(cityTimestamp * 1000).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }
        );

        setCurrentTime(cityTime);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    console.log(name);
    // const cityId = parseInt(id ?? "", 10); // Use empty string as default value
    if (name !== undefined) {
      fetchWeatherData(name);
    }
  }, [name]);

  useEffect(() => {
    const calculateDaylight = () => {
      if (sunrise && sunset) {
        const sunriseTime: Date = new Date(sunrise * 1000);
        const sunsetTime: Date = new Date(sunset * 1000);

        const length: number =
          (sunsetTime.getTime() - sunriseTime.getTime()) / 1000; // Length of day in seconds

        const hours = Math.floor(length / 3600);
        const minutes = Math.floor((length % 3600) / 60);

        setLengthOfDay(`${hours}H ${minutes}M`);

        const now = new Date();
        let remaining: number = (sunsetTime.getTime() - now.getTime()) / 1000; // Daylight remaining in seconds
        if (remaining < 0) {
          remaining = 0; // Set to zero if current time is past sunset
        }
        const remainingHours = Math.floor(remaining / 3600);
        const remainingMinutes = Math.floor((remaining % 3600) / 60);

        setDaylightRemaining(`${remainingHours}H ${remainingMinutes}M`);
      }
    };

    calculateDaylight();
  }, [sunrise, sunset]);

  const convertTimestampToHours = (timestamp: number): number => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const minutes = date.getMinutes();
    const decimalHours = date.getHours() + minutes / 60;
    let roundedDecimalHours = Number(decimalHours.toFixed(1));
    if (roundedDecimalHours > 12) {
      roundedDecimalHours -= 12;
    }

    return roundedDecimalHours;
  };

  if (!weatherData) {
    return <div>Loading... ..</div>;
  }
  const chartData = {
    labels: [1, 2, 3],
    datasets: [
      {
        label: "Sunrise and Sunset Times",
        data: [
          convertTimestampToHours(sunrise),
          12,
          convertTimestampToHours(sunset),
        ],
        backgroundColor: "aqua",
        borderColor: "black",
        tension: 0.4,
      },
    ],
  };
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
        },
      },
      y: {
        ticks: {
          callback: (value) => {
            return `${value} H`;
          },
        },
      },
    },
  };


  const temperatureInCelsius = Math.round(weatherData.main.temp - 273.15);
  const imgUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <>
    
    <div className="weather-details-container">
    <div style={{display:'flex',justifyItems:'space-between',alignItems:"center"}}>
      <div className="backbutton">
        <a style={{textDecoration:'none', color:'black',}} href="/">BACK</a>
      </div>
        <AddToList name={weatherData.name} weatherData={weatherData}/>
    </div>
      <div className="header-details">
        <img
          className="city-weather-img"
          src={imgUrl}
          alt={weatherData.weather[0].description}
        ></img>
        <div className="city-details">
          <p className="city-name">{weatherData.name}</p>
          <img src={vector} alt="vector" />
        </div>
        <div className="temp-details">
          <p className="temp-value">{temperatureInCelsius}</p>
          <img src={degree} alt="degree" />
        </div>
      </div>

      <div className="section-details">
        <div className="time-details">
          <p>TIME</p>
          <p> {currentTime}</p>
        </div>
        <div className="pressure-details">
          <p>PRESSURE</p>
          <p>963</p>
        </div>
        <div className="rain-details">
          <p>%RAIN</p>
          <p>{rainPercentage}</p>
        </div>
        <div className="humidity-details">
          <p>HUMIDITY</p>
          <p>22</p>
        </div>
      </div>

      <div className="footer-details">
        <div className="day-details">
          <p className="day-heading">SUNRISE & SUNSET</p>
          <div className="day-data">
            <div className="day-length">
              <p className="day-heading">Length of day:</p>
              <p className="day-value">{lengthOfDay}</p>
            </div>
            <div className="day-remain">
              <p className="day-heading">Remaining daylight:</p>
              <p className="day-value">{daylightRemaining}</p>
            </div>
          </div>
        </div>
        <div className="day-graph">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
    </>
  );
};

export default WeatherDetails;