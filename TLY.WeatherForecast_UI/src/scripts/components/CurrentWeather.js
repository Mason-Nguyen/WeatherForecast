import React from "react"
import config from '../../config/config.json'
import '../../scss/CurrentWeather.scss'

const CurrentWeather = ({currentData}) => 
    <div className='current-weather flex-center-col'>
        <label className='bold-label city-label block-item'>{currentData.cityName}</label>
        <label className='current-time text-center'>{currentData.currentTime}</label>

        <div className='weather-description flex-center'>
            <img src={`${config.Icon_Url}${currentData.icon}.png`} alt='no content' className='weather-icon'/>
            <label id='label-temperature'>{currentData.temp}</label>
        </div>
        <label className='label-description text-center'>{currentData.description}</label>

        <div className='flex-center'>
            <div className='flex-center-item'>
                <label className='block-item'>Humidity</label>
                <label className='humidity bold-label'>{currentData.humidity}</label>
            </div>
            <div className='flex-center-item'>
                <label className='block-item'>Wind Speed</label>
                <label className='wind-speed bold-label'>{currentData.windSpeed}</label>
            </div>
        </div>
    </div>

export default CurrentWeather