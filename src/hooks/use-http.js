import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { weatherActions } from "../store/weather-slice";

const useHttp = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      weatherActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Getting data",
      })
    );
    axios({
      method: "GET",
      url: url,
      params: { u: url },
    })
      .then((res) => {
        dispatch(
          weatherActions.showNotification({
            status: "success",
            title: "Success...",
            message: "Data fetched succesfully",
          })
        );
        console.log(res.data);
      })
      .catch((err) =>
        dispatch(
          weatherActions.showNotification({
            status: "error",
            title: "Error!...",
            message: "Failed to get data",
          })
        )
      );
  }, [url]);
};
export default useHttp;
