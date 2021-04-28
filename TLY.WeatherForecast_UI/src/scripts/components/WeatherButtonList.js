import WeatherButton from './WeatherButton'

const WeatherButtonList = ({dataByDates}) => 
    <div className='weather-list'>
        {
            dataByDates.map(dataByDate => 
                <WeatherButton {...dataByDate}/>)
        }
    </div>

export default WeatherButtonList
    