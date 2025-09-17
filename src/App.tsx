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
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=36.7323&longitude=3.0875&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m&timezone=Europe%2FLondon";
  const fetchUrl = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data.current);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUrl();
  }, []);

  console.log("the weatehr  is ", weatherData);

  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Input />
        <WeatherCard weather={weatherData} />
      </main>
    </>
  );
}

export default App;
