import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div>
      <Button
        variant={`${selectedCity == null ? "secondary" : "outline-secondary"}`}
        onClick={() => handleCityChange("current")} className="button"
      >
        현재 위치
      </Button>

      {cities.map((city) => (
        <Button
          variant={`${
            selectedCity == city ? "secondary" : "outline-secondary"
          }`}
          onClick={() => handleCityChange(city)} className="button"
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
