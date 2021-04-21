namespace TLY.WeatherForecast.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using TLY.WeatherForecast.Services;

    [Route("[controller]/[action]")]
    [ApiController]
    public class WeatherForecastController : Controller
    {
        private readonly IWeatherForecastService _weatherService;

        public WeatherForecastController(IWeatherForecastService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCurrent([FromQuery] string cityName)
        {
            if (IsValidCityName(cityName))
            {
                var data = await _weatherService.GetCurrentWeatherByCityName(cityName);
                return Ok(data);
            }

            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetForecast([FromQuery] string cityName)
        {
            if (IsValidCityName(cityName))
            {
                var data = await _weatherService.GetForecastDataInFiveDaysByCityName(cityName);
                return Ok(data);
            }

            return NotFound();
        }

        private static bool IsValidCityName(string cityName) => !string.IsNullOrWhiteSpace(cityName);
    }
}
