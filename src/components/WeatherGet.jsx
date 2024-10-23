import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherGet.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('New York');
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Use Vite's way to access environment variables

    const getWeather = async () => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=36e9b557e5e24feeace82632242310&q=${city}&aqi=no
`);
            setWeather(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <div className='weather-main'>
            <h2 className='weather-title'>Weather in {weather?.location?.name}</h2>
            <p className='weather-temp'>Temperature: {weather?.current?.temp_c} °C</p>
            <p className='weather-cond'>Condition: {weather?.current?.condition?.text}</p>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={getWeather}>Search</button>
        </div>
    );
};

export default Weather;
