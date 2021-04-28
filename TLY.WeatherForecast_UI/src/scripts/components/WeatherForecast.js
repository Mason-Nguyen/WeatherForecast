import React from 'react'

import WeatherButtonList from './WeatherButtonList'

class WeatherForecast extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: this._getChartData(props.daily[0])
        }
    }

    _getChartData(dataByDate) {
        return {
            MaxTemp: convertToCelsius(dataByDate.temp.max),
            CurrentTemp: convertToCelsius(dataByDate.temp.day),
            MinTemp: convertToCelsius(dataByDate.temp.min),
        }
    }

    _getDataByDates() {
        return this.props.daily.map(d => {
            return {
                Date: d.dt,
                Icon: d.Icon,
                Humidity: d.Humidity
            }
        })
    }

    render() {
        const dataByDates = this._getDataByDates()
        const {chartData} = this.state

        return(
            <React.Fragment>
                <WeatherLineChart {...chartData} />
                <WeatherButtonList dataByDates={dataByDates}/>
            </React.Fragment>
        )
    }
}

export default WeatherForecast