namespace TLY.WeatherForecast.Criteria
{
    public class WeatherForecastCriteria : GeoCoordinateCriteriaBase
    {
        public string Exclude { get; set; } = "minutely,hourly,alerts";
    }
}
