import config from '../../config/config.json'
import '../../scss/WeatherButton.scss'

const WeatherButton = ({dataByDate, isActive, onClick}) => {
    const isActiveClassName = isActive ? 'focus' : ''
    return <div className={`weather-button text-center ${isActiveClassName}`} onClick={onClick}>
                <label>{dataByDate.Date}</label>
                <img src={`${config.Icon_Url}${dataByDate.Icon}.png`}/>
                <label className='humidity bold'>{dataByDate.Humidity}</label>
            </div>
}
    

export default WeatherButton
