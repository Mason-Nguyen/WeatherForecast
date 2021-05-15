import {Component} from 'react'
import {convertToCelsius} from '../helpers/TemperatureHelper'

import WeatherButtonList from './WeatherButtonList'
import WeatherLineChart from './WeatherLineChart'

class WeatherForecast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activedButtonId: 0
        }
        this._onSelectedDayChange = this._onSelectedDayChange.bind(this)
    }

    _getChartData(id) {
        const dataByDate = this.props.dailyData[id];
        return {
            MinTemp: convertToCelsius(dataByDate.MinTemp),
            CurrentTemp: convertToCelsius(dataByDate.CurrentTemp),
            MaxTemp: convertToCelsius(dataByDate.MaxTemp),
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

    _onSelectedDayChange(activedButtonId) {
        if (this.state.activedButtonId !== activedButtonId) {
            this.setState({activedButtonId: activedButtonId})
        }
    }

    render() {
        const dataByDates = this._getDataByDates()
        const {activedButtonId} = this.state
        const chartData = this._getChartData(activedButtonId)

        return(
            <div className='col-lg-8'>
                <WeatherLineChart {...chartData} />
                <WeatherButtonList dataByDates={dataByDates}
                                    activedButtonId={activedButtonId}
                                    onButtonClick={this._onSelectedDayChange}/>
            </div>
        )
    }
}

export default WeatherForecast