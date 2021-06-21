import React from "react"
import config from '../../config/config.json'
import '../../scss/CurrentWeather.scss'

const CurrentWeather = ({ currentData }) =>
    <div className='current-weather flex-center-col'>
        <label id='label-temperature'>{currentData.temp}</label>
        <label className='bold-label city-label block-item'>{currentData.cityName}</label>
        <label className='label-description text-center'>{currentData.description}</label>
        <div className='weather-description flex-center'>
            <img src={`${config.Icon_Url}${currentData.icon}@2x.png`} alt='no content' className='weather-icon' />
        </div>
        <div className='flex-center'>
            <div className='flex-center-item'>
                <label className='humidity bold-label'>{currentData.humidity}</label>
            </div>
            <div className='flex-center-item'>
                <label className='wind-speed bold-label'>{currentData.windSpeed}</label>
            </div>
        </div>
    </div>

export default CurrentWeather