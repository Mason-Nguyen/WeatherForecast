import React, { useEffect, useState } from "react"
import { get } from 'axios'
import { formatDate } from "../helpers/DateHelper"

import Map from "../components/Map"
import WeatherInfor from "../components/WeatherInfor"

const WeatherForecast = ({ geoCoordinate }) => {
    const [forecastData, setForecastData] = useState({
        geoCoordinate: null,
        dailyData: null
    })

    useEffect(() => {
        async function _getDataAsync() {
            const response = await get(`https://localhost:44309/WeatherForecast/GetWeatherData` +
                `?Latitude=${geoCoordinate.lat}` +
                `&Longitude=${geoCoordinate.lon}`)

            setForecastData({
                lat: geoCoordinate.lat,
                lon: geoCoordinate.lon,
                dailyData: _getDailyData(response.data)
            })
        }

        _getDataAsync()
    }, []);

    const _onCoordinateChange = async (e) => {
        const lat = e.latlng.lat
        const lon = e.latlng.lng

        const response = await get(`https://localhost:44309/WeatherForecast/GetWeatherData` +
            `?Latitude=${lat}` +
            `&Longitude=${lon}`)

        setForecastData({
            geoCoordinate: {
                lat: lat,
                lon: lon
            },
            dailyData: _getDailyData(response.data)
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
            <Map geoCoordinate={forecastData.geoCoordinate ?? geoCoordinate}
                onMapClick={_onCoordinateChange} />
            {
                forecastData.dailyData && <WeatherInfor dailyData={forecastData.dailyData} />
            }
        </>
    )
}

export default WeatherForecast