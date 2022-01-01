import { API_BASE_URL, API_KEY } from "../config/config";
import { weatherActions } from "./weather-slice";

export const fetchWeatherData = (inputRef) => {
  return async (dispatch) => {
    dispatch(
      weatherActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Data is sending",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(`${API_BASE_URL}${inputRef}&key=${API_KEY}`);

      if (!res.ok) {
        dispatch(
          weatherActions.showNotification({
            status: "error",
            title: "Error!...",
            message: "Data fetching failed!",
          })
        );
        return;
      }

      const data = await res.json();

      return data;
    };

    try {
      const data = await sendRequest();
      dispatch(
        weatherActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Data fetched succesfully",
        })
      );

      dispatch(
        weatherActions.setWeatherData({
          cityName: data.city_name,
          countryCode: data.country_code,
          lat: data.lat,
          lon: data.lon,
          timezone: data.timezone,
          weatherData: data.data,
        })
      );
    } catch (err) {
      dispatch(
        weatherActions.showNotification({
          status: "error",
          title: "Error!...",
          message: "Data fetching failed!",
        })
      );
    }
  };
};
