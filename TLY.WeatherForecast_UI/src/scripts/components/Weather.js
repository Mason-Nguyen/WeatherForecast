import React, { useState, useEffect } from 'react'
import { get } from 'axios'
import "../../scss/Weather.scss"

import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'
import BlockUi from './core/blockUI/BlockUI'

import { convertToCelsius } from '../helpers/TemperatureHelper'
import { formatDate } from '../helpers/DateHelper'

const Weather = () => {
    const [currentData, setCurrentData] = useState({
        isLoading: true,
        weatherData: null,
        geoCoordinate: null
    })

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

        const response = await get(`https://localhost:44309/WeatherForecast/GetCurrentWeatherData` +
            `?Latitude=${latitude}` +
            `&Longitude=${longitude}`)
        
        setCurrentData({
            isLoading: false,
            weatherData: _getCurrentData(response.data),
            geoCoordinate: {
                lat: latitude,
                lon: longitude
            }
        })
    }

    const _onGetLocationError = () => {
        console.log("Unable to retrieve your location");
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
            cityName: weatherData.name,
            currentTime: formatDate(weatherData.dt, dateOptions),
            icon: weatherData.weather[0].icon,
            temp: convertToCelsius(weatherData.main.temp),
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
        }
    }

    const _renderCurrentWeather = (weatherData) => {
        return weatherData && <CurrentWeather currentData={weatherData} />
    }

    const _renderWeatherForecast = (geoCoordinate) => {
        return geoCoordinate && <WeatherForecast geoCoordinate={geoCoordinate} />
    }

    return <BlockUi tag='div' blocking={currentData.isLoading} keepInView={true} message="Collecting data, please wait...">
                <div className='flex-center'>
                    {_renderCurrentWeather(currentData.weatherData)}
                </div>
                <div className='section'>
                    <span className='section-name'>Weather Forecast</span>
                </div>
                <div className='flex-center-col'>
                    {_renderWeatherForecast(currentData.geoCoordinate)}
                </div>
            </BlockUi>
}

export default Weather