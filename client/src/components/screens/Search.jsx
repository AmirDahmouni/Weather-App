import React, { useState } from "react";

import "../styles/Search.css";

export default function Search({ searchCity }) {
  const [currentCity, setCurrentCity] = useState("");

 
  function handleKeyPress(e) {
    if (e.key === "Enter" && currentCity.trim() !== "")
    searchCity(currentCity);
  }

  return (
    <div className="Search">
      <label className="Search__label">
        <input
          className="Search__input"
          value={currentCity}
          onChange={(e)=>setCurrentCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </label>
      <button className="Search__button" onClick={()=>searchCity(currentCity)}>
        Search
      </button>
    </div>
  );
}