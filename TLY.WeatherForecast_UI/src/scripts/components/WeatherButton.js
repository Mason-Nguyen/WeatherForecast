import config from '../../config/config.json'
import '../../scss/WeatherButton.scss'

import React from 'react'

const WeatherButton = React.forwardRef((props, buttonRef) => (
    <div className='weather-button text-center' onClick={() => props.onClick(props.Date)} ref={buttonRef}>
        <label>{props.Date}</label>
        <img src={`${config.Icon_Url}${props.Icon}.png`}/>
        <label className='humidity bold'>{props.Humidity}</label>
    </div>
))

export default WeatherButton
