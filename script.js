const mapurl = "https://europe-west1-pracabezgranic-backend.cloudfunctions.net/weather/location-info?address="
const weatherurl = "https://europe-west1-pracabezgranic-backend.cloudfunctions.net/weather"

const makeUrlGoogle = () => {
    let addressFromUser = document.getElementById("address").value.split(" ")
    let googleURL = addressFromUser.join('+')
    return mapurl + googleURL
}

const getJsonFromUrl = async (url) =>
    fetch(url).then(data => data.json())

const makeUrlWeather = (lat, lng) =>
    `${weatherurl}/${lat}/${lng}`

const fahrenheitToCelsius = (temperature) =>
    (temperature - 32) * 5 / 9

const doStuff = async () => {
    document.getElementById("download").style.display = "block"
    let mapData = await getJsonFromUrl(makeUrlGoogle())
    if (mapData.status != "OK") {
        document.getElementById("place").innerHTML = "There is no place like that"
        document.getElementById("aboutweather").innerHTML = ""
        document.getElementById("download").style.display = "none"
    } else {
        let { lat, lng } = mapData.results[0].geometry.location
        let weatherData = await getJsonFromUrl(makeUrlWeather(lat, lng))
        document.getElementById("download").style.display = "none"
        let apparentTemperature = Math.round(fahrenheitToCelsius(weatherData.currently.apparentTemperature) * 10) / 10
        let temperature = Math.round(fahrenheitToCelsius(weatherData.currently.temperature) * 10) / 10
        let dailyWeather = weatherData.hourly.summary
        let summaryWeather = weatherData.currently.summary
        document.getElementById("place").innerHTML = mapData.results[0].formatted_address
        document.getElementById("aboutweather").innerHTML = `It's ${temperature}℃ but it feels like ${apparentTemperature}℃.${dailyWeather}${summaryWeather}`
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode == 13) doStuff()
})