import React from 'react'

import WeatherButton from './WeatherButton'
import '../../scss/WeatherButtonList.scss'

const WeatherButtonList = React.forwardRef((props, buttonRef) => (
    <div className='weather-list flex-space-around'>
        {
            props.dataByDates.map((dataByDate, i) => 
                <WeatherButton key={i} {...dataByDate} onClick={props.onButtonClick} ref={buttonRef}/>)
        }
    </div>
))

export default WeatherButtonList
    