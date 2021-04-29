import react from 'react'
import "../../scss/Weather.scss"

import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'

import data from '../../data/data.json'

import { convertToCelsius } from '../helpers/TemperatureHelper'
import { getCityName } from '../helpers/StringHelper'
import { formatDate } from '../helpers/DateHelper'

class Weather extends react.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const currentData = this._getCurrentData()
        const dailyData = this._getDailyData()
        this.setState({
            currentData: currentData,
            dailyData: dailyData
        })
    }

    _getDailyData() {
        const dateOptions = {
            weekday: 'short',
            day: 'numeric'
        };

        return data.daily.map(d => {
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

    _getCurrentData() {
        const dateOptions = {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        return {
            CityName: getCityName(data.timezone),
            CurrentTime: formatDate(data.current.dt, dateOptions),
            Icon: data.current.weather[0].icon,
            Temp: convertToCelsius(data.current.temp),
            Description: data.current.weather[0].description,
            Humidity: data.current.humidity,
            WindSpeed: data.current.wind_speed
        }
    }

    _renderCurrentWeather(currentData) {
        return currentData && <CurrentWeather currentData={currentData} />
    }

    _renderWeatherForecast(dailyData) {
        return dailyData && <WeatherForecast dailyData={dailyData} />
    }

    render() {
        const { currentData, dailyData } = this.state;
        return (
            <div className='row'>
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