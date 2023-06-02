import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import TopNav from "./components/TopNav/TopNav";
import WeatherApp from "./components/Dashboard/WeatherApp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import { store } from "./components/Redux/store";
function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <TopNav />
      <Router>
        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/weather-details/:name" element={<WeatherDetails Name={WeatherDetails.name} />} />
          <Route path="/weatherApp" element={<WeatherApp/>}/>
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
