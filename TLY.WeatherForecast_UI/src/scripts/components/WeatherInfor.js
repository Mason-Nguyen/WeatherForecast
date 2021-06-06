import React, {useState} from "react"
import { convertToCelsius } from '../helpers/TemperatureHelper'

import WeatherButtonList from './WeatherButtonList'
import WeatherLineChart from './WeatherLineChart'

const WeatherInfor = ({dailyData}) => {
    const [activedButtonId, setActiveButtonId] = useState(0)

    const _getChartData = (index) => {
        const dataByDate = dailyData[index];
        return {
            minTemp: convertToCelsius(dataByDate.MinTemp),
            currentTemp: convertToCelsius(dataByDate.CurrentTemp),
            maxTemp: convertToCelsius(dataByDate.MaxTemp),
        }
    }

    const _getDataByDates = () => dailyData.map(d => {
        return {
            Date: d.Date,
            Icon: d.Icon,
            Humidity: d.Humidity
        }
    })

    const _onSelectedDayChange = (currentButtonId) => {
        if (activedButtonId !== currentButtonId) {
            setActiveButtonId(currentButtonId)
        }
    }

    const dataByDates = _getDataByDates()
    const chartData = _getChartData(activedButtonId)

    return <div className='col-lg-8'>
                <WeatherLineChart {...chartData} />
                <WeatherButtonList dataByDates={dataByDates}
                                    activedButtonId={activedButtonId}
                                    onButtonClick={_onSelectedDayChange} />
            </div>
}

export default WeatherInfor