import React, { useState } from "react";

import "./WeatherApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import DefaultWatchlist from "./DefaultWatchlist";
import axios from "axios";

import { WeatherData } from "../weatherTypes";
import WeatherCard from "./WeatherCard";

let cities: string[] = [
  // Add more initial city names as needed
];
const WeatherApp = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchedCities, setSearchedCities] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setCity(value);
    const filteredCities: string[] = cities.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedCities(filteredCities);
  };

  const fetchData = async (city: string) => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5427a0f5207b76cb82078bf8d15c9cb`
      );
      // console.log(response.data);
      if (city && !cities.includes(city)) {
        cities.push(city);
        console.log("LL");
      }

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  const handleIconClick = () => {
    const enteredCity = city.trim();
    fetchData(enteredCity);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion);
  };
  const handleInputClick = () => {
    setSearchedCities([...cities]);
  };
  return (
    <div className="weather-container">
      <div className="input-feild">
        <input
          className="location"
          type="text"
          value={city}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Search Location"
        />
        <button className="search-btn" onClick={handleIconClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="suggestions">
        {searchedCities.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>

      <div className="display-section">
        {weatherData ? (
          <WeatherCard data={weatherData} />
        ) : (
          <DefaultWatchlist />
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
