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
                                        buttonId={i}
                                        onClick={onButtonClick}/>
            })
        }
    </div>

export default WeatherButtonList
    