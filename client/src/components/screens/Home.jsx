import React, { useState, useEffect } from "react";

import Header from "./Header"
import "../styles/WeatherAndForecast.css";

import getAddressOfCoordinates from "../Services/reverseGeocoding";
import getCoordinatesOfAddress from "../Services/forwardGeocoding";
import getWeatherAndForecast from "../Services/weatherAndForecast";
import WeatherAndForecast from "./WeatherAndForecast";
import GlobalContext from "../../GlobalContext";


export default function Home() {

  const context = React.useContext(GlobalContext)
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [contentState, setContentState] = useState("blank");

  function searchCity(target) {
    setAddress(target.charAt(0).toUpperCase() + target.slice(1));
  }

  function showWarning() {
    setContentState("warning");
    setTimeout(() => setContentState("blank"), 3000);
  }

  function makeRequest({coords}) {
    setContentState("loading");
    getAddressOfCoordinates(coords.latitude,coords.longitude)
    .then((res) => {
      context.setLocationInfo({
          city: res.data.results[0].components.city_district,
          town: res.data.results[0].components.town,
          state: res.data.results[0].components.state_code,
          country: res.data.results[0].components.country_code
        });
    })
    .then(() =>
        setCoordinates({
          lat: coords.latitude,
          lng: coords.longitude
        })
    )
    .catch((error) => showWarning());
  }

  

  useEffect(() => {
    
    if (navigator.geolocation) 
      navigator.geolocation.getCurrentPosition(makeRequest, (err)=>alert("ERROR(" + err.code + "): " + err.message));
    else 
      alert("Geolocation is not supported by this browser.");
    
  }, []);

  useEffect(() => {
    if (address === "") return;
   
    setContentState("loading");
    getCoordinatesOfAddress(address)
      .then((res) => {
        if (
          res.data.results.length === 0 ||
          (res.data.results[0].components.city === undefined &&
            res.data.results[0].components.town === undefined)
        ) {
          showWarning();
          return;
        }
        setCoordinates(res.data.results[0].geometry);
        context.setLocationInfo({
          city: res.data.results[0].components.city,
          town: res.data.results[0].components.town,
          state: res.data.results[0].components.state_code,
          country: res.data.results[0].components.country_code
        });
      })
      .catch((error) => showWarning());
  }, [address]);

  useEffect(() => {
    if (Object.keys(coordinates).length === 0) return;

    getWeatherAndForecast(coordinates)
      .then((res) => {
        context.setWeatherAndForecastInfo(res.data);
        setContentState("weatherAndForecast");
      })
      .catch((error) => showWarning());
  }, [coordinates]);


  const Main = {
    blank: () => null,
    loading: () => <></>,
    warning: () => <></>,
    weatherAndForecast: () => (
      <WeatherAndForecast
        coordinates={coordinates}
      />
    )
  };

  return (
    <div className="App">
      <div className="App__container">
        <>
          <Header searchCity={searchCity} />
          {Main[contentState]()}
        </>
        
      </div>
    </div>
  );

}