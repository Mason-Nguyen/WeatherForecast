namespace TLY.WeatherForecast.Services
{
    using System.Threading.Tasks;

    public interface IWeatherForecastService
    {
        Task<string> GetCurrentWeatherByCityName(string cityName);

        Task<string> GetForecastDataInFiveDaysByCityName(string cityName);
    }
}
