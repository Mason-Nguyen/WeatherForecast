import config from '../../config/config.json'

const WeatherDay = (dailyData) => 
    <div className='text-cent'>
        <label>{dailyData.Date}</label>
        <url src={`${config.Icon_Url}${dailyData.Icon}.png`}/>
        <label>Humidity</label>
        <label className='humidity'>{dailyData.Humidity}</label>
    </div>

export default WeatherDay
