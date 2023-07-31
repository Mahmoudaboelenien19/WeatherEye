import React, { useRef, useState } from "react";
import Header from "./component/Header";
import Input from "./component/Input";
import Result from "./component/Result";
import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import Grid from "react-spinners/GridLoader";
import { motion } from "framer-motion";
import "./App.scss";
import Loading from "./component/Loading";

const App = () => {
  const override = {
    display: "block",

    margin: "0 auto",
  };
  const err = useRef();
  const [error, setError] = useState(true);
  const [weatherdata, setWeatherData] = useState({});
  const [isMainLoading, setIsMainLoading] = useState(true);
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
    setTimeout(() => {
      setIsMainLoading(false);
    }, 1200);
  }, []);
  useEffect(() => {
    if (value.length == "") return;
    fetched();
  }, [value]);

  return (
    <>
      {isMainLoading ? (
        <Loading />
      ) : (
        <motion.div
          className="cont"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.2, 0.6, 0.8, 1] }}
        >
          <Header />
          <Input />
          <div id="result">
            {!error ? (
              <Result {...weatherdata} />
            ) : (
              <div
                ref={err}
                id="err"
                className={loading == true ? "none" : "block"}
              >
                Enter a city
              </div>
            )}
            <Grid
              color={"green"}
              loading={loading}
              cssOverride={override}
              size={5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default App;
