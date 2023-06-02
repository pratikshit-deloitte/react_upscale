import React from "react";
import myImage from "../../assets/weather.png";
import "./TopNav.css";
const TopNav = () => {
  return (
    <div className="topnav-container">
      <img className="weather-img" src={myImage} alt="weather img" />
      <p className="title"> Weather ForeCaster</p>
    </div>
  );
};

export default TopNav;
