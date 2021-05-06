import react from 'react'
import axios from 'axios'
import "../../scss/Weather.scss"

import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'
import BlockUi from './core/blockUI/BlockUI'

import { convertToCelsius } from '../helpers/TemperatureHelper'
import { getCityName } from '../helpers/StringHelper'
import { formatDate } from '../helpers/DateHelper'

class Weather extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
        this._onGetLocationSuccess = this._onGetLocationSuccess.bind(this)
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._onGetLocationSuccess, this._onGetLocationError);
        }
        else {
            console.log("Geolocation is not supported by your browser");
        }
    }

    _onGetLocationSuccess(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`${latitude} - ${longitude}`);

        axios.get(`https://localhost:44309/WeatherForecast/GetWeatherData?Latitude=${latitude}&Longitude=${longitude}`)
            .then((response) => {
                const weatherData = response.data
                const currentData = this._getCurrentData(weatherData)
                const dailyData = this._getDailyData(weatherData)

                this.setState({
                    isLoading: false,
                    currentData: currentData,
                    dailyData: dailyData
                })
            })
    }

    _onGetLocationError() {
        console.log("Unable to retrieve your location");
    }

    _getDailyData(weatherData) {
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

    _getCurrentData(weatherData) {
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

    _renderCurrentWeather(currentData) {
        return currentData && <CurrentWeather currentData={currentData} />
    }

    _renderWeatherForecast(dailyData) {
        return dailyData && <WeatherForecast dailyData={dailyData} />
    }

    render() {
        const { currentData, dailyData, isLoading } = this.state;
        return (
            isLoading 
            ? <BlockUi tag='div' blocking={isLoading}></BlockUi> 
            : <div className='row'>
                    {
                        this._renderCurrentWeather(currentData)
                    }
                    {
                        this._renderWeatherForecast(dailyData)
                    }
              </div>
        )
    }
}

export default Weather