import react from 'react'

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
            MinTemp: convertToCelsius(dataByDate.temp.min),
            Temp: convertToCelsius(dataByDate.temp.day),
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
            <>
                <WeatherLineChart dailyData={chartData} />
                <WeatherButtonList dataByDates={dataByDates}/>
            </>
        )
    }
}

export default WeatherForecast