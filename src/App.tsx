import { useEffect, useState } from "react";
import Input from "./components/Input";
import Nav from "./components/Nav";
import WeatherCard from "./components/WeatherCard";
import type { CurrentWeather } from "./assets/currentWeather.types";
import "./App.css";

function App() {
  const initialWeather = {
    time: "",
    temperature_2m: 0,
    relative_humidity_2m: 0,
    is_day: 0,
    apparent_temperature: 0,
    wind_speed_10m: 0,
  };

  const [weatherData, setWeatherData] =
    useState<CurrentWeather>(initialWeather);
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  console.log(date);
  const fetchCoordinates = async (location: string) => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&count=1`;
    try {
      const res = await fetch(geoUrl);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country } = data.results[0];
        fetchWeather(latitude, longitude);
      } else {
        alert("Location not found. Try another city or spelling.");
      }
    } catch (e) {
      alert("Error fetching location coordinates.");
      console.error(e);
    }
  };

  const fetchWeather = async (latitude: number, longitude: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m&timezone=Europe%2FLondon`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.current) {
        setWeatherData(data.current);
      } else if (data.current_weather) {
        setWeatherData({
          time: data.current_weather.time || "",
          temperature_2m: data.current_weather.temperature || 0,
          relative_humidity_2m: 0,
          is_day: data.current_weather.is_day || 0,
          apparent_temperature: 0,
          wind_speed_10m: data.current_weather.windspeed || 0,
        });
      }
    } catch (e) {
      alert("Error fetching weather data.");
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCoordinates("Algiers");
  }, []);

  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Input onSearch={fetchCoordinates} />
        <WeatherCard weather={weatherData} />
      </main>
    </>
  );
}

export default App;
