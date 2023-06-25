// Global variables

var cityInputEl = document.querySelector("#city");
var cityHistoryFormEl = document.querySelector("#city-history-form");
var currentForecastEl = document.querySelector("#current-forecast");
var fiveDayForecastEl = document.querySelector("#five-day-forecast");

var cities = [];

var lat;
var lon;

// API key
const APIkey = '66b78b76cf28151458f6e4a1d8e96fc6';

var cityFormEl = document.querySelector("#city-search");

function init()
{
    if (localStorage.getItem("Cities") !== null)
    {
        var storedCities = localStorage.getItem("Cities");

        cities = JSON.parse(storedCities);

        getCityHistory();
    }
}

function getCityHistory()
{
    for (var i = 0; i < cities.length; i++)
    {
        var button = document.createElement("button");

        button.textContent = cities[i];

        button.setAttribute("type", "submit");
        button.setAttribute("class", "col-12 btn btn-primary mt-2");

        cityHistoryFormEl.appendChild(button);
    }
}

function getLocation(currentCity)
{
    var geocodingRequestURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + currentCity + '&limit=1&appid=' + APIkey;

    fetch(geocodingRequestURL)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            // console.log(data);

            lat = data[0].lat;
            lon = data[0].lon;

            getWeather(currentCity, lat, lon);
        });
}

function getWeather(currentCity, lat, lon)
{
    console.log(currentCity);
    console.log(lat);
    console.log(lon);

    var weatherRequestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey + '&units=imperial';
    
    fetch(weatherRequestURL)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data);

            var cityWeather = [

                {
                    cityName: currentCity,
                    date: dayjs.unix(data.list[0].dt).format('MM/DD/YYYY'),
                    icon: data.list[0].weather[0].icon,
                    tempurature: data.list[0].main.temp,
                    wind: data.list[0].wind.speed,
                    humidity: data.list[0].main.humidity
                },

                {
                    cityName: currentCity,
                    date: dayjs.unix(data.list[7].dt).format('MM/DD/YYYY'),
                    icon: data.list[7].weather[0].icon,
                    tempurature: data.list[7].main.temp,
                    wind: data.list[7].wind.speed,
                    humidity: data.list[7].main.humidity
                },

                {
                    cityName: currentCity,
                    date: dayjs.unix(data.list[15].dt).format('MM/DD/YYYY'),
                    icon: data.list[15].weather[0].icon,
                    tempurature: data.list[15].main.temp,
                    wind: data.list[15].wind.speed,
                    humidity: data.list[15].main.humidity
                },

                {
                    cityName: currentCity,
                    date: dayjs.unix(data.list[23].dt).format('MM/DD/YYYY'),
                    icon: data.list[23].weather[0].icon,
                    tempurature: data.list[23].main.temp,
                    wind: data.list[23].wind.speed,
                    humidity: data.list[23].main.humidity
                },

                {
                    cityName: currentCity,
                    date: dayjs.unix(data.list[31].dt).format('MM/DD/YYYY'),
                    icon: data.list[31].weather[0].icon,
                    tempurature: data.list[31].main.temp,
                    wind: data.list[31].wind.speed,
                    humidity: data.list[31].main.humidity
                },

                {
                    cityName: currentCity,
                    date: dayjs.unix(data.list[39].dt).format('MM/DD/YYYY'),
                    icon: data.list[39].weather[0].icon,
                    tempurature: data.list[39].main.temp,
                    wind: data.list[39].wind.speed,
                    humidity: data.list[39].main.humidity
                }
            ];

            console.log(cityWeather);

            displayWeather(cityWeather);
        });
}

function displayWeather(cityWeather)
{
    var showCityNameAndDate = document.createElement("h3");
    showCityNameAndDate.textContent = cityWeather[0].cityName + " " + cityWeather[0].date;
    showCityNameAndDate.setAttribute("class", "pt-3 ps-2");
    currentForecastEl.appendChild(showCityNameAndDate);

    var showIcon = document.createElement("img");
    showIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + cityWeather[0].icon + ".png");
    showIcon.setAttribute("class", "pt-2 ps-2");
    currentForecastEl.appendChild(showIcon);

    var showTempurature = document.createElement("p");
    showTempurature.textContent = "Temp: " + cityWeather[0].tempurature + " °F";
    showTempurature.setAttribute("class", "pt-2 ps-2");
    currentForecastEl.appendChild(showTempurature);

    var showWind = document.createElement("p");
    showWind.textContent = "Wind: " + cityWeather[0].wind + " MPH";
    showWind.setAttribute("class", "pt-2 ps-2");
    currentForecastEl.appendChild(showWind);

    var showHumidity = document.createElement("p");
    showHumidity.textContent = "Humidity: " + cityWeather[0].humidity + " %";
    showHumidity.setAttribute("class", "pt-2 ps-2");
    currentForecastEl.appendChild(showHumidity);

    for (var i = 1, j = 0; i < cityWeather.length; i++, j++)
    {
        var date = document.createElement("p");
        date.textContent = cityWeather[i].date;
        date.setAttribute("class", "pt-2 text-white");
        fiveDayForecastEl.children[j].children[0].appendChild(date);

        var icon = document.createElement("img");
        icon.setAttribute("src", "https://openweathermap.org/img/wn/" + cityWeather[i].icon + ".png");
        fiveDayForecastEl.children[j].children[0].appendChild(icon);

        var tempurature = document.createElement("p");
        tempurature.textContent = "Temp: " + cityWeather[i].tempurature + " °F";
        tempurature.setAttribute("class", "pt-2 text-white");
        fiveDayForecastEl.children[j].children[0].appendChild(tempurature);

        var wind = document.createElement("p");
        wind.textContent = "Wind: " + cityWeather[i].wind + " MPH";
        wind.setAttribute("class", "pt-2 text-white");
        fiveDayForecastEl.children[j].children[0].appendChild(wind);

        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + cityWeather[i].humidity + " %";
        humidity.setAttribute("class", "pt-2 text-white");
        fiveDayForecastEl.children[j].children[0].appendChild(humidity);
    }
}

function clearWeatherForecast()
{
    while (currentForecastEl.firstChild)
    {
        currentForecastEl.removeChild(currentForecastEl.firstChild);
    }

    for (var i = 0; i < 5; i++)
    {
        while (fiveDayForecastEl.children[i].children[0].firstChild)
        {
            fiveDayForecastEl.children[i].children[0].removeChild(fiveDayForecastEl.children[i].children[0].firstChild);
        }
    }
}

cityHistoryFormEl.addEventListener("submit", function(event)
{
    event.preventDefault();

    console.log(event);

    clearWeatherForecast();

    var selectedCity = event.submitter.textContent;

    console.log(selectedCity);

    getLocation(selectedCity);
})

cityFormEl.addEventListener("submit", function(event)
{
    event.preventDefault();

    console.log(event);

    clearWeatherForecast();

    var cityAlreadyInHistory = false;

    for (var i = 0; i < city.length; i++)
    {
        if (cities[i] === cityInputEl.value)
        {
            cityAlreadyInHistory = true;
        }
    }

    if (!cityAlreadyInHistory)
    {
        cities.push(cityInputEl.value);

        console.log(cities);
    
        localStorage.setItem("Cities", JSON.stringify(cities));
    }

    getLocation(cities[cities.length - 1]);
});

init();

// To do

// Save city history and display on click