export function getCityName(timezone) {
    var cityString = timezone.split("/")[1];
    return cityString.trim().replaceAll("_", " ");
}