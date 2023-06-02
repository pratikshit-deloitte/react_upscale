import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import cloudImage from "../../assets/clouds.png";
import "./DefaultWatchlist.css";
import { useSelector } from "react-redux";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { selectCityNames } from "../Redux/weatherSlice";

const DefaultWatchlist = () => {
  const cityNames = useSelector(selectCityNames);

  if (cityNames.length === 0) {
    return (
      <div className="defaultwatchlist-container">
        <img className="clouds" src={cloudImage} alt="clouds img" />
        <p className="empty-watchlist">No Location added to watchlist</p>
      </div>
    );
  }

  return (
    <Splide options={{ type: 'loop', perPage: 1 }}>
      {cityNames.map((city: { id: React.Key | null | undefined; name: any; }) => (
        <SplideSlide key={city.id}>
          <WeatherDetails name={city.name} />
        </SplideSlide>
      ))}
    </Splide>
  );
};


export default DefaultWatchlist;
