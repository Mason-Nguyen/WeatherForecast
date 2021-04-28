import config from '../../config/config.json'

const WeatherButton = ({Date, Icon, Humidity}) => 
    <div className='text-cent'>
        <label>{Date}</label>
        <url src={`${config.Icon_Url}${Icon}.png`}/>
        <label>Humidity</label>
        <label className='humidity'>{Humidity}</label>
    </div>

export default WeatherButton
