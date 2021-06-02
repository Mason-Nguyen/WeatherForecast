import React, { useState, useEffect } from 'react'
import { get } from 'axios'
import "../../scss/Weather.scss"

import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'
import BlockUi from './core/blockUI/BlockUI'

import { convertToCelsius } from '../helpers/TemperatureHelper'
import { getCityName } from '../helpers/StringHelper'
import { formatDate } from '../helpers/DateHelper'

const Weather = () => {
    const [isLoading, setIsLoadng] = useState(true)
    const [currentData, setCurrentData] = useState(null)
    const [dailyData, setDailyData] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(_onGetLocationSuccess, _onGetLocationError);
        }
        else {
            console.log("Geolocation is not supported by your browser");
        }
    }, [])

    const _onGetLocationSuccess = async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`${latitude} - ${longitude}`);

        const response = await get(`https://localhost:44309/WeatherForecast/GetWeatherData` +
            `?Latitude=${latitude}` +
            `&Longitude=${longitude}`)

        const weatherData = response.data
        const currentData = _getCurrentData(weatherData)
        const dailyData = _getDailyData(weatherData)

        setIsLoadng(false)
        setCurrentData(currentData)
        setDailyData(dailyData)
    }

    const _onGetLocationError = () => {
        console.log("Unable to retrieve your location");
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

    const _getCurrentData = (weatherData) => {
        const dateOptions = {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        return {
            CityName: getCityName(weatherData.timezone),
            CurrentTime: formatDate(weatherData.current.dt, dateOptions),
            Icon: weatherData.current.weather[0].icon,
            Temp: convertToCelsius(weatherData.current.temp),
            Description: weatherData.current.weather[0].description,
            Humidity: weatherData.current.humidity,
            WindSpeed: weatherData.current.wind_speed
        }
    }

    const _renderCurrentWeather = (currentData) => {
        return currentData && <CurrentWeather currentData={currentData} />
    }

    const _renderWeatherForecast = (dailyData) => {
        return dailyData && <WeatherForecast dailyData={dailyData} />
    }

    return <BlockUi tag='div' blocking={isLoading} KeepInView={true} message="Collecting data, please wait...">
                <div className='flex-center'>
                    {_renderCurrentWeather(currentData)}
                </div>
                <div className='section'>
                    <span className='section-name'>Weather Forecast</span>
                </div>
                <div className='flex-center'>
                    {_renderWeatherForecast(dailyData)}
                </div>
            </BlockUi>
}

export default Weather