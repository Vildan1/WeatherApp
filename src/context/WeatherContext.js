import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const WeatherContext = createContext() //create context

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("Iğdır") //default city
  const [weatherInfo, setWeatherInfo] = useState()

  useEffect(() => {
    const api = "8d79f3b10639458de3ad9ba4e2e9f631" //api key
    const baseURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${api}&cnt=40` //base url

    if (city) { //if city is not empty
      axios(baseURL)
        .then(res => {
          const dailyWeatherData = res.data.list.filter((data, index) => index % 8 === 0);
          setWeatherInfo(dailyWeatherData);
        })
        .catch((e) => alert("Please Enter valid City Name"))

    }
  }, [city])

  //we can use this object to pass the values to the children
  const values = {
    city,
    setCity,
    weatherInfo,
    setWeatherInfo,

  }


  return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
}

export const useWeather = () => useContext(WeatherContext);