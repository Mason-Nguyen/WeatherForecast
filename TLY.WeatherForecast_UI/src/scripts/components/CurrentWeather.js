import config from '../../config/config.json'
import '../../scss/CurrentWeather.scss'

const CurrentWeather = ({currentData}) => 
    <div className='current-weather col-lg-4'>
        <label className='bold-label col-lg-4'>Your city</label>
        <input id='city-input' className='col-lg-8 input' value={currentData.CityName} readOnly></input>

        <label className='current-time col-lg-12 text-center'>{currentData.CurrentTime}</label>

        <div className='weather-description flex-center'>
            <img src={`${config.Icon_Url}${currentData.Icon}.png`} alt='no content' className='weather-icon'/>
            <label id='label-temperature'>{currentData.Temp}</label>
        </div>
        <label className='label-description col-lg-12 text-center'>{currentData.Description}</label>

        <div className='flex-center'>
            <div className='flex-center-item'>
                <label className='block-item'>Humidity</label>
                <label className='humidity bold-label'>{currentData.Humidity}</label>
            </div>
            <div className='flex-center-item'>
                <label className='block-item'>Wind Speed</label>
                <label className='wind-speed bold-label'>{currentData.WindSpeed}</label>
            </div>
        </div>
    </div>

export default CurrentWeather