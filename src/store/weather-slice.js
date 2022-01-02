import { createSlice } from "@reduxjs/toolkit";

const weatherSliceInitialState = {
  weatherData: [],
  filteredData: [],
  onlyFiveData: [],
  notification: null,
};

const weatherSlice = createSlice({
  name: "weater",
  initialState: weatherSliceInitialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setWeatherData(state, action) {
      const weatherItem = action.payload;

      const filteredAllData = action.payload.weatherData.splice(1);
      const onlyFiveData = filteredAllData.slice();

      state.weatherData.push({
        cityName: weatherItem.cityName,
        countryCode: weatherItem.countryCode,
        lat: weatherItem.lat,
        lon: weatherItem.lon,
        timezone: weatherItem.timezone,
        weatherData: weatherItem.weatherData,
      });
      state.filteredData = filteredAllData;
      state.onlyFiveData = onlyFiveData;
    },
    remove(state) {
      state.weatherData = [];
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice;
