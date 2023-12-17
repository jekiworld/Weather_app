import React, { useReducer, useContext } from "react";
import { WeatherReducer } from './Reducer';

const WeatherAPPContext = React.createContext();

const WeatherAPPProvider = ({ children }) => {
    const [state, dispatch] = useReducer(WeatherReducer, {
        city: {
            "city": "Nur-Sultan", 
            "lat": "51.1694",
            "lng": "71.4491",
            "country": "Kazakhstan",
            "iso2": "KZ",
            "admin_name": "Nur-Sultan",
            "capital": "primary",
            "population": "1112000",
            "population_proper": "1112000"
        },
        current: '',
        daily: ''
    });

    return (
        <WeatherAPPContext.Provider value={{ state, dispatch }}>
            {children}
        </WeatherAPPContext.Provider>
    );
}

export default WeatherAPPProvider;

export const UseWeatherAppContext = () => {
    return useContext(WeatherAPPContext);
}
