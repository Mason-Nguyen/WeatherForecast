namespace TLY.WeatherForecast.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using TLY.WeatherForecast.Criteria;
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
        public async Task<IActionResult> GetWeatherData([FromQuery] WeatherForecastCriteria criteria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _weatherService.GetWeatherForecastData(criteria);

            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetCurrentWeatherData([FromQuery] GeoCoordinateCriteriaBase criteria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _weatherService.GetCurrentWeather(criteria);

            return Ok(data);
        }
    }
}
