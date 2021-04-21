namespace TLY.WeatherForecast.Services.Implement
{
    using Microsoft.Extensions.Configuration;
    using System.Net.Http;
    using System.Threading.Tasks;

    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public WeatherForecastService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetCurrentWeatherByCityName(string cityName)
            => await _httpClient.GetStringAsync($"/data/2.5/weather?q={cityName}&appid={GetAPIKey()}");

        public async Task<string> GetForecastDataInFiveDaysByCityName(string cityName)
            => await _httpClient.GetStringAsync($"/data/2.5/forecast?q={cityName}&appid={GetAPIKey()}");

        private string GetAPIKey() => _configuration["WeatherForecastAPI_Key"];
    }
}
