import React, { useRef, useState } from "react";
import Header from "./component/Header";
import Input from "./component/Input";
import Result from "./component/Result";
import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import "./App.scss";

const App = () => {
  const err = useRef();
  const [error, setError] = useState(true);
  const [weatherdata, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const link = `https://api.openweathermap.org/data/2.5/`;
  const key = "58dc397350b4c0c627a975f6654d5241";
  const { value } = useSelector((vl) => vl.input);

  const fetched = async () => {
    try {
      setError(true);

      setLoading(true);
      const response = await fetch(
        `${link}weather?q=${value}&units=metric&APPID=${key}`
      );
      const data = await response.json();
      if (data.cod == 404) {
        setError(true);
        setLoading(false);
        err.current.innerHTML = "City Not Found";
        throw Error("can't fetch data");
      }
      console.log(data);
      if (data.cod == 200) {
        setLoading(false);

        setError(false);
        const {
          name,
          wind: { speed },
          weather: [{ main, icon }],
          main: { temp, temp_min, temp_max },
        } = data;

        setWeatherData({
          name,
          speed,
          main,
          temp,
          temp_min,
          temp_max,
          icon,
        });
      }
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  useEffect(() => {
    if (value.length == "") return;
    fetched();
  }, [value]);

  return (
    <div className="cont">
      <Header />
      <Input />
      {!error ? (
        <Result {...weatherdata} />
      ) : (
        <div ref={err} id="err" className={loading == true ? "none" : "block"}>
          Enter a city
        </div>
      )}
      {loading && <div id="loading">Loading</div>}
    </div>
  );
};

export default App;
