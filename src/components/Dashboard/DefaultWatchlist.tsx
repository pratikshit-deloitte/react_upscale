import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import cloudImage from "../../assets/clouds.png";
import "./DefaultWatchlist.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCityNames, addCityName, removeCityName } from "../Redux/weatherSlice";

interface WeatherData {
  main: {
    temp: number;
    pressure: number;
  };
}

const WeatherCard: React.FC<{ cityName: string; weatherData: WeatherData }> = ({ cityName, weatherData }) => {
  if (!weatherData || !weatherData.main) {
    return (
      <div className="weather-card">
        <h3>{cityName}</h3>
        <p>Weather data not available</p>
      </div>
    );
  }

  const { temp, pressure } = weatherData.main;

  return (
    <div className="weather-card">
      <h3>{cityName}</h3>
      <p>Temperature: {temp} °C</p>
      <p>Pressure: {pressure} hPa</p>
    </div>
  );
};

const DefaultWatchlist = () => {
  const cityNames = useSelector(selectCityNames);
  const dispatch = useDispatch();

    useEffect(() => {
      const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    
      const fetchData = async (cityName: string) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
          );
          const data = await response.json();
          dispatch(addCityName({ name: cityName, data }));
        } catch (error) {
          console.error(error);
        }
      };
    
      const newCityNames = cityNames.filter((city: { data: null; }) => city.data === null); // Get only the new city names without data
      newCityNames.forEach((city: { name: string; }) => {
        fetchData(city.name);
      });
    }, [cityNames, dispatch]);

  const handleRemoveCity = (cityName: string) => {
    dispatch(removeCityName(cityName));
  };

  if (cityNames.length === 0) {
    return (
      <div className="defaultwatchlist-container">
        <img className="clouds" src={cloudImage} alt="clouds img" />
        <p className="empty-watchlist">No Location added to watchlist</p>
      </div>
    );
  }

  return (
    <Splide options={{ type: "loop", perPage: 1 }}>
      {cityNames.map((city: { id: React.Key | null | undefined; name: string; data: WeatherData; }) => (
        <SplideSlide key={city.id}>
          <WeatherCard cityName={city.name} weatherData={city.data} />
          <button onClick={() => handleRemoveCity(city.name)}>Remove</button>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default DefaultWatchlist;
