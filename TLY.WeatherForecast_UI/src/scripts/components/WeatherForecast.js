import React, { useEffect, useState } from "react"
import { get } from 'axios'
import { formatDate } from "../helpers/DateHelper"

import Map from "../components/Map"
import WeatherInfor from "../components/WeatherInfor"

const WeatherForecast = ({ geoCoordinate }) => {
    const [weatherData, setWeatherData] = useState({
        lat: null,
        lon: null,
        weatherData: null
    })

    useEffect(() => {
        async function getDataAsync() {
            const response = await get(`https://localhost:44309/WeatherForecast/GetWeatherData` +
            `?Latitude=${geoCoordinate.lat}` +
            `&Longitude=${geoCoordinate.lon}`)

            setWeatherData({
                lat: geoCoordinate.lat,
                lon: geoCoordinate.lon,
                weatherData: _getDailyData(response.data)
            })
        }

        getDataAsync()
    }, []);

    const _onCoordinateChange = async (e) => {
        const lat = e.latlng.lat
        const lon = e.latlng.lng

        const response = await get(`https://localhost:44309/WeatherForecast/GetWeatherData` +
            `?Latitude=${lat}` +
            `&Longitude=${lon}`)

            setWeatherData({
            lat: lat,
            lon: lon,
            weatherData: _getDailyData(response.data)
        })
    }

    const _getDailyData = (weatherData) => {
        const dateOptions = {
            weekday: 'short',
            day: 'numeric'
        };

        return weatherData.daily.map(d => {
            return {
                Date: formatDate(d.dt, dateOptions),
                MaxTemp: d.temp.max,
                CurrentTemp: d.temp.day,
                MinTemp: d.temp.min,
                Humidity: d.humidity,
                Icon: d.weather[0].icon
            };
        }).slice(0, 5)
    }

    return (
        <>
            <Map
                latitude={weatherData.lat ?? geoCoordinate.lat}
                longitude={weatherData.lon ?? geoCoordinate.lon}
                onMapClick={_onCoordinateChange} />
            
            {
                weatherData.weatherData 
                && <WeatherInfor dailyData={weatherData.weatherData} />
            }
        </>
    )
}

export default WeatherForecast