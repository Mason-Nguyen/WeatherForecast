import config from '../../config/config.json'
import '../../scss/CurrentWeather.scss'

const CurrentWeather = ({currentData}) => 
    <div className='current-weather col-lg-4'>
        <label className='bold-label w100'>Your city</label>
        <input id='city-input' value={currentData.CityName} readOnly></input>
        <label className='current-time'>{currentData.CurrentTime}</label>
        <img src={`${config.Icon_Url}${currentData.Icon}.png`} alt='no content'/>
        <label className='label-temperature'>{currentData.Temp}</label>
        <label className='label-label'>{currentData.Description}</label>
        <label className='label'>Humidity</label>
        <label className='label-label'>{currentData.Humidity}</label>
        <label className='label'>Wind Speed</label>
        <label className='label-label'>{currentData.WindSpeed}</label>
    </div>

export default CurrentWeather