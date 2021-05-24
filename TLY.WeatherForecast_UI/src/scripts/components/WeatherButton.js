import React from "react"
import config from '../../config/config.json'
import '../../scss/WeatherButton.scss'

const WeatherButton = ({dataByDate, isActive, buttonId, onClick}) => {
    const isActiveClassName = isActive ? 'focus' : ''
    const _onButtonClick = () => {
        onClick(buttonId)
    }

    return <div className={`weather-button text-center ${isActiveClassName}`} onClick={_onButtonClick}>
                <label>{dataByDate.Date}</label>
                <img src={`${config.Icon_Url}${dataByDate.Icon}.png`}/>
                <label className='humidity bold'>{dataByDate.Humidity}</label>
            </div>
}
    

export default WeatherButton
