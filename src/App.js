import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import classes from "./App.module.css";
import { fetchWeatherData } from "./store/weather-actions";
import ErrorCmp from "./components/UI/ErrorCmp";
import Spinner from "./components/UI/Spinner";
import { weatherActions } from "./store/weather-slice";

function App() {
  const dispatch = useDispatch();
  const actions = useSelector((state) => state.weather);
  const inputRef = useRef();
  const listRef = useRef();
  const specialClasses =
    actions.weatherData.length > 0 ? classes.containerHeight : "";
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      return;
    }
    let currentInputValue = inputRef.current.value;
    dispatch(fetchWeatherData(currentInputValue));
    inputRef.current.value = "";
    inputRef.current.blur();
    dispatch(weatherActions.remove());
  };

  const defaultWeatherContent = actions.weatherData.map((data) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const weatherData = data.weatherData[0];
    const dateTime = new Date(weatherData.datetime);
    const day = dateTime.getDay();
    const dateString = days[day];

    return (
      <div key={data.cityName} className={classes.weatherContainer}>
        <div className={classes.about}>
          <h6>
            {data.cityName} ({data.countryCode})
          </h6>
          <h5>
            Coords: (Lat: {data.lat}, Lon: {data.lon})
          </h5>
          <h5>Timezone: {data.timezone}</h5>
        </div>
        <div className={classes.weatherFirstContainer}>
          <div className={classes.localWeatherReport}>
            <h1>LOCAL WEATHER REPORT</h1>
            <div className={classes.activeWeatherContent}>
              <div className={classes.activeContentLeft}>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`}
                />
                <h3>WS: {`${weatherData.wind_spd} M/S`}</h3>
              </div>
              <div className={classes.activeContentRight}>
                <h2>{dateString}</h2>
                <h4>{weatherData.weather.description}</h4>
                <h3>{`${weatherData.high_temp} °C`}</h3>
                <h3>{`${((weatherData.high_temp * 9) / 5 + 32).toFixed(
                  2
                )} °F`}</h3>
              </div>
            </div>
          </div>
          <div className={classes.seaForecastReport}>
            <h1>MORE INFORMATION</h1>
            <ul>
              <li ref={listRef}>
                Wind Speed (KM/H)
                <span>{`${(weatherData.wind_spd * 3.6).toFixed(2)}`} KM/H</span>
              </li>
              <li ref={listRef}>
                Wind Gusts (KM/H)
                <span>{(weatherData.wind_gust_spd * 3.6).toFixed(2)} KM/H</span>
              </li>
              <li ref={listRef}>
                Wind Direction <span>{weatherData.wind_cdir}</span>
              </li>
              <li ref={listRef}>
                Max Temp (°C) <span>{weatherData.max_temp} °C</span>
              </li>
              <li ref={listRef}>
                Min Temp (°C) <span>{weatherData.min_temp} °C</span>
              </li>
              <li ref={listRef}>
                Avg Temp (°C) <span>{weatherData.temp} °C</span>
              </li>
              <li ref={listRef}>
                Average Cloud Cover (%) <span>{weatherData.clouds} %</span>
              </li>
              <li ref={listRef}>
                Probability Of Precipitation (%)
                <span>{weatherData.pop} %</span>
              </li>
              <li ref={listRef}>
                Accumulated Snowfall (mm)
                <span>{weatherData.snow.toFixed(2)} mm</span>
              </li>
              <li ref={listRef}>
                Snow Depth (mm)
                <span>{weatherData.snow_depth.toFixed(2)} mm</span>
              </li>
              <li ref={listRef}>
                Average Sea Level Pressure (mb)
                <span>{weatherData.slp.toFixed(2)} mb</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.weatherSecondContainer}>
          {actions.onlyFiveData.map((data) => {
            const fiveDaysDate = new Date(data.datetime);
            const fiveDaysDay = fiveDaysDate.getDay();
            const fiveDaysString = days[fiveDaysDay];
            const splitedDate = fiveDaysDate.toString().split(" ");
            const monthName = splitedDate[1];
            const dateNumber = splitedDate[2];

            return (
              <div
                key={Math.random()}
                className={classes.weatherFiveDaysContainer}
              >
                <h2>{`${fiveDaysString} ${monthName} ${dateNumber}`}</h2>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
                />
                <h4>{`${data.high_temp}`} °C</h4>
                <h3>{`${((data.high_temp * 9) / 5 + 32).toFixed(2)}`} °F</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      <main className={`${classes["main__container"]} ${specialClasses}`}>
        <form onSubmit={formSubmitHandler}>
          <div className="input-group mb-3">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              placeholder="ქალაქის სახელი ( ნებისმიერ ენაზე )"
            />
            <button className="btn btn-danger" type="submit">
              მოძებნე
            </button>
          </div>
        </form>
        {actions.notification &&
          actions.notification.status !== "error" &&
          defaultWeatherContent}
        {actions.notification && actions.notification.status === "error" && (
          <ErrorCmp />
        )}
        {actions.notification && actions.notification.status === "pending" && (
          <Spinner />
        )}
        {!actions.notification && (
          <h1 className={classes.welcome}>Welcome ;) </h1>
        )}
      </main>
    </>
  );
}

export default App;
