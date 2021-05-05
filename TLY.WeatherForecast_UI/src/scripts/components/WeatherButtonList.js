import React from 'react'

import WeatherButton from './WeatherButton'
import '../../scss/WeatherButtonList.scss'

const WeatherButtonList = ({dataByDates, activedButtonId, onButtonClick}) => 
    <div className='weather-list flex-space-around'>
        {
            dataByDates.map((dataByDate, i) => {
                const isActive = i === activedButtonId;
                return <WeatherButton key={i} 
                                        dataByDate={dataByDate}
                                        isActive={isActive}
                                        onClick={() => onButtonClick(i)}/>
            })
        }
    </div>

export default WeatherButtonList
    