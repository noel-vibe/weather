import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity,handleCityChange}) => {

  return (
    <div>
      <Button variant={`${selectedCity == null ? "secondary" : "outline-secondary"}`} onClick={() => handleCityChange("current")}>Current Location</Button>

      {cities.map((city) => (
        <Button variant={`${selectedCity == city ? "secondary" : "outline-secondary"}`} onClick={() => handleCityChange(city)}>
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
