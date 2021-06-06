namespace TLY.WeatherForecast.Services.Implement
{
    using Microsoft.Extensions.Configuration;
    using System.Net.Http;
    using System.Threading.Tasks;
    using TLY.WeatherForecast.Criteria;

    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public WeatherForecastService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetWeatherForecastData(WeatherForecastCriteria criteria)
            => await _httpClient.GetStringAsync($"/data/2.5/onecall?" +
                $"lat={criteria.Latitude}" +
                $"&lon={criteria.Longitude}" +
                $"&exclude={criteria.Exclude}" +
                $"&appid={GetAPIKey()}");

        public async Task<string> GetCurrentWeather(GeoCoordinateCriteriaBase criteria)
            => await _httpClient.GetStringAsync($"/data/2.5/weather?" +
                $"lat={criteria.Latitude}" +
                $"&lon={criteria.Longitude}" +
                $"&appid={GetAPIKey()}");

        private string GetAPIKey() => _configuration["WeatherForecastAPI_Key"];
    }
}
