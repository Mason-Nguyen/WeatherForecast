import react from 'react'
import "../../scss/Weather.scss"

import CurrentWeather from './CurrentWeather'
import {convertToCelsius} from '../helpers/TemperatureHelper'
import data from '../../data/data.json'

class Weather extends react.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const currentData = this._getCurrentData()
        this.setState({currentData})
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
            CityName: data.timezone.split("/")[1],
            CurrentTime: dateTime,
            Icon: data.current.weather[0].icon,
            Temp: convertToCelsius(data.current.temp),
            Description: data.current.weather[0].description,
            Humidity: data.current.humidity,
            WindSpeed: data.current.wind_speed
        }
    }

    render() {
        const {currentData} = this.state;
        return (
            currentData ? <CurrentWeather currentData={currentData}/> : null
        )
    }
}

export default Weather