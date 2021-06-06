namespace TLY.WeatherForecast.Services
{
    using System.Threading.Tasks;
    using TLY.WeatherForecast.Criteria;

    public interface IWeatherForecastService
    {
        Task<string> GetWeatherForecastData(WeatherForecastCriteria criteria);

        Task<string> GetCurrentWeather(GeoCoordinateCriteriaBase criteria);
    }
}
