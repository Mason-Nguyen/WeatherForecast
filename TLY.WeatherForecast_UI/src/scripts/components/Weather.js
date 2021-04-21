import react from 'react'
import "../../scss/Weather.scss"

import CurrentWeather from './CurrentWeather'
import data from '../../data/data.json'

class Weather extends react.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        var currentData = this._getCurrentData()
        this.setState({currentData: currentData})
    }

    _getCurrentData() {
        var dateOptions = {  
            hour:'2-digit', 
            minute: '2-digit', 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return {
            CityName: data.name,
            CurrentTime: (new Date(data.dt)).toLocaleDateString('en-US', dateOptions),
            Icon: data.weather[0].icon,
            Temp: data.main.temp,
            Description: data.weather[0].description,
            Humidity: data.main.humidity,
            WindSpeed: data.wind.speed
        }
    }

    render() {
        return (
            this.state.currentData ? <CurrentWeather currentData={this.state.currentData}/> : <div></div>
        )
    }
}

export default Weather