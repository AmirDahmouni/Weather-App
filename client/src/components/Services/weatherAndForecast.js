import axios from "axios";

async function getWeatherAndForecast(coordinates) {
  const response = await axios.post("http://localhost:5000/weather/current",{coordinates});
  return response;
}

export default getWeatherAndForecast;