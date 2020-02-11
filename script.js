const mapurl = "http://europe-west1-pracabezgranic-backend.cloudfunctions.net/weather/location-info?address="
const weatherurl = "https://europe-west1-pracabezgranic-backend.cloudfunctions.net/weather"

const makeUrlGoogle = () => {
    const addressfromuser = document.getElementById("address").value.split(" ")
    let googleurl = mapurl
    addressfromuser.forEach(word => {
        googleurl += word + "+"
    })
    return googleurl
}

const getJsonFromUrl = async (url) => {
    let fetched = await fetch(url)
    let jsoned = await fetched.json()
    return jsoned
}

const makeUrlWeather = (lat, lng) => {
    return weatherurl+"/"+lat+"/"+lng
}

const fahrenheitToCelsius = (temperature) => (temperature - 32) * 5 / 9


const doStuff = async () => {
    const mapapi = await getJsonFromUrl(makeUrlGoogle())
    const lat = mapapi.results[0].geometry.location.lat
    const lng = mapapi.results[0].geometry.location.lng
    const weatherapi = await getJsonFromUrl(makeUrlWeather(lat, lng))
    const apparentTemperature = Math.round(fahrenheitToCelsius(weatherapi.currently.apparentTemperature) * 10) / 10
    const temperature = Math.round(fahrenheitToCelsius(weatherapi.currently.temperature) * 10) / 10
    const dailyweather = weatherapi.hourly.summary
    const summaryweather = weatherapi.currently.summary
    document.getElementById("place").innerHTML = mapapi.results[0].formatted_address
    document.getElementById("aboutweather").innerHTML = `It's ${temperature}℃ but it feels like ${apparentTemperature}℃.${dailyweather}${summaryweather}`
}



document.addEventListener('keydown', event => {
    if (event.keyCode == 13) doStuff()
})