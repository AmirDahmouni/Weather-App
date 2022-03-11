import React from "react";

import Weather from "./Weather";
import Forecast from "./Forest";
import GlobalContext from "../../GlobalContext";

function WeatherAndForecast({coordinates}) {

  
  const context = React.useContext(GlobalContext)
  const date = dateBuilder(new Date());
  function dateBuilder(d) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const date = [];

    for (let count = 0; count < 5; count++) {
      if (d.getDay() + count < 7) date[count] = d.getDay() + count;
      else if (d.getDay() + count === 7) date[count] = 0;
      else if (d.getDay() + count === 8) date[count] = 1;
      else if (d.getDay() + count === 9) date[count] = 2;
      else if (d.getDay() + count === 10) date[count] = 3;
    }

    return [
      days[date[0]],
      days[date[1]],
      days[date[2]],
      days[date[3]],
      days[date[4]]
    ];
  }

  return ( 
    <div className="WeatherAndForecast">
      <Weather weatherInfo={context.weatherAndForecastInfo} coordinates={coordinates}  date={date[0]} />
      <div className="WeatherAndForecast__container">
        <Forecast weatherInfo={context.weatherAndForecastInfo.daily[0]} date={date[0]} />
        <Forecast weatherInfo={context.weatherAndForecastInfo.daily[1]} date={date[1]} />
        <Forecast weatherInfo={context.weatherAndForecastInfo.daily[2]} date={date[2]} />
        <Forecast weatherInfo={context.weatherAndForecastInfo.daily[3]} date={date[3]} />
        <Forecast weatherInfo={context.weatherAndForecastInfo.daily[4]} date={date[4]} />
      </div>
    </div>
  );
}

export default WeatherAndForecast;