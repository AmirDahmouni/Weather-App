import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

const AppContext = (props) => {
    const [user, setUser] = React.useState(null)
    const [weatherAndForecastInfo, setWeatherAndForecastInfo] = useState({});
    const [locationInfo, setLocationInfo] = useState({});

    return (
        <GlobalContext.Provider value={{
            user,setUser,
            weatherAndForecastInfo,setWeatherAndForecastInfo,
            locationInfo,setLocationInfo
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
};
export default AppContext;