import React from "react";

const Result = ({ name, icon, speed, main, temp, temp_min, temp_max }) => {
  const urlIcon = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <>
      <h3>
        <span>{name}</span>
        <img src={urlIcon} alt={main} />
      </h3>
      <p>
        <span>Temp:</span>
        <span>{Math.floor(temp)}°C</span>
      </p>
      <p>
        {" "}
        <span>Wind Speed:</span>
        <span>{speed} km/h</span>
      </p>

      <p>
        <span>Weather:</span>
        <span>{main}</span>
      </p>
      <p>
        <span> Temp range:</span>
        <span>
          {Math.floor(temp_min)} °C / {Math.floor(temp_max)}°C
        </span>
      </p>
    </>
  );
};

export default Result;
