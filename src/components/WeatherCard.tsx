import React from "react";
import type { CurrentWeather } from "../assets/currentWeather.types";
const WeatherCard = ({ weather }: { weather: CurrentWeather }) => {
  return (
    <div className="weather-card">
      <h2>Weather Card</h2>
      <div className="weather-grid">
        <div className="weather-item">
          <div className="label">Time</div>
          <div className="value">{weather.time}</div>
        </div>
        <div className="weather-item">
          <div className="label">Temperature</div>
          <div className="value">{weather.temperature_2m} °C</div>
        </div>
        <div className="weather-item">
          <div className="label">Feels like</div>
          <div className="value">{weather.apparent_temperature} °C</div>
        </div>
        <div className="weather-item">
          <div className="label">Humidity</div>
          <div className="value">{weather.relative_humidity_2m} %</div>
        </div>
        <div className="weather-item">
          <div className="label">Wind speed</div>
          <div className="value">{weather.wind_speed_10m} m/s</div>
        </div>
        <div className="weather-item">
          <div className="label">Is day</div>
          <div className="value">{weather.is_day ? "Yes" : "No"}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
