import react from 'react'
import "../../scss/Weather.scss"

import CurrentWeather from './CurrentWeather'
import WeatherLineChart from './WeatherLineChart'

import data from '../../data/data.json'

import {convertToCelsius} from '../helpers/TemperatureHelper'
import {getCityName} from '../helpers/StringHelper'

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
        return data.daily.map(d => {
            return {
                MaxTemp: convertToCelsius(d.temp.max),
                CurrentTemp: convertToCelsius(d.temp.day),
                MinTemp: convertToCelsius(d.temp.min),
            };
        })
    }

    _getCurrentData() {
        const dateOptions = {  
            hour:'2-digit', 
            minute: '2-digit', 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };

        const dateTime = (new Date(data.current.dt)).toLocaleDateString('en-US', dateOptions)
        return {
            CityName: getCityName(data.timezone),
            CurrentTime: dateTime,
            Icon: data.current.weather[0].icon,
            Temp: convertToCelsius(data.current.temp),
            Description: data.current.weather[0].description,
            Humidity: data.current.humidity,
            WindSpeed: data.current.wind_speed
        }
    }

    _renderCurrentWeather(currentData) {
        return currentData && <CurrentWeather currentData={currentData}/>
    }

    _renderWeatherLineChart(dailyData) {
        return dailyData && <WeatherLineChart {...dailyData[0]}/>
    }

    render() {
        const {currentData, dailyData} = this.state;
        return (
            <div className='row'>
                {
                    this._renderCurrentWeather(currentData)
                }
                {
                    this._renderWeatherLineChart(dailyData)
                }
            </div>
        )
    }
}

export default Weather