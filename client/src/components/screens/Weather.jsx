import React, { useEffect, useState } from "react";
import GlobalContext from '../../GlobalContext';
import {addFavoris, removeFavoris}  from "../Services/userServices";

export default function Current({ weatherInfo, date,coordinates }) {
  const context = React.useContext(GlobalContext)

  
  const [favoris,setFavoris]=useState(context.user.favoris.findIndex(item=>
    item.city==context.locationInfo.city)!=-1 ? true:false)

  useEffect(()=>{
    setFavoris(context.user.favoris.findIndex(item=>item.city==context.locationInfo.city)!=-1 ? false:true)
  },[context.locationInfo])

  
  const movefavoris=async()=>{
    if(favoris==true)
   {
      
      await addFavoris(coordinates.lng,coordinates.lat,context.locationInfo.city,context.locationInfo.country,context.user.token)
      let user={...context.user}
      user.favoris.push({long:coordinates.lng,lat:coordinates.lat,city:context.locationInfo.city,country:context.locationInfo.country})
      context.setUser(user)
      setFavoris(false)
      
      
   }
   else if(favoris==false){
      
      await removeFavoris(context.locationInfo.city,context.user.token)
      let user={...context.user}
      user.favoris=user.favoris.filter(elem=>elem.city.toUpperCase()!==context.locationInfo.city.toUpperCase())
      context.setUser(user)  
      setFavoris(true)
   }
  }
  
  return ( 
    <div className="Weather">
      <div className="Weather__info">
        { 
          favoris ?
          (<svg onClick={()=>movefavoris()}  xmlns="http://www.w3.org/2000/svg"  width="40" height="40" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
          <path  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>):
          (<svg onClick={()=>movefavoris()} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>)              
        }
        <img
          className="Weather__icon"
          src={"https://openweathermap.org/img/wn/" +weatherInfo.current.weather[0].icon +".png"}
          alt={weatherInfo.current.weather[0].main}
        />
        
        


        <ul className="Weather__list">
          <li className="list__temperature">
            {Math.round(weatherInfo.current.temp)}
            <sup className="list__temperature-symbol">°C</sup>
          </li>
          <li> Humidity: {weatherInfo.current.humidity}% </li>
          <li>
            {" "}
            Wind: {Math.round(weatherInfo.current.wind_speed * 3.6)} km/h{" "}
          </li>
        </ul>
      </div>
      <div className="Weather__other-info">
        <h2 className="other-info__city">
          {context.locationInfo.city || context.locationInfo.town},{" "}
          {context.locationInfo.state || context.locationInfo.country.toUpperCase()}
        </h2>
        <h3 className="other-info__clouds">{date}</h3>
        <h3 className="other-info__clouds">
          {weatherInfo.current.weather[0].description}
        </h3>
      </div>
    </div>
  );
}