import React from 'react'
import {convertToCelsius} from '../helpers/TemperatureHelper'

import WeatherButtonList from './WeatherButtonList'
import WeatherLineChart from './WeatherLineChart'

class WeatherForecast extends React.Component {
    constructor(props) {
        super(props)
        this.buttonRef = React.createRef()
        this.state = {
            chartData: this._getChartData(props.dailyData[0])
        }

        this._onSelectedDayChange = this._onSelectedDayChange.bind(this)
    }

    _getChartData(dataByDate) {
        return {
            MaxTemp: convertToCelsius(dataByDate.MaxTemp),
            CurrentTemp: convertToCelsius(dataByDate.CurrentTemp),
            MinTemp: convertToCelsius(dataByDate.MinTemp),
        }
    }

    _getDataByDates() {
        return this.props.dailyData.map(d => {
            return {
                Date: d.Date,
                Icon: d.Icon,
                Humidity: d.Humidity
            }
        })
    }

    _onSelectedDayChange(date) {
        var dataByDate = this.props.dailyData.filter(d => d.Date === date)[0];
        var chartData = this._getChartData(dataByDate);
        this.buttonRef.current.focus()

        this.setState({chartData})
    }

    render() {
        const dataByDates = this._getDataByDates()
        const {chartData} = this.state

        return(
            <div className='col-lg-8'>
                <WeatherLineChart {...chartData} />
                <WeatherButtonList dataByDates={dataByDates} onButtonClick={this._onSelectedDayChange} ref={this.buttonRef}/>
            </div>
        )
    }
}

export default WeatherForecast