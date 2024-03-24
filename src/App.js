import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import WeatherButton from "./component/WeatherButton";
import WeatherBox from "./component/WeatherBox";
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨 화씨 날씨상태
//3. 5개의 버튼이 있다(1개의 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할떄 마다 도시별 날씨가 나온다
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다

const cities = ["paris","new york","tokyo","seoul"];
const API_KEY = "5932e0b7d653b20d4eb4cca9bc29d587";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
     if (city == null) {
       setLoading(true);
       getCurrentLocation();
     } else {
    setLoading(true);
    getWeatherByCity();
     }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <div>
        {loading ? (
          <div className="container">
            <ClipLoader color="#gray" size={150} loading={loading} />
          </div>
        ) : !apiError ? (
          <div class="container">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        ) : (
          apiError
        )}
      </div>
  );
};
export default App;