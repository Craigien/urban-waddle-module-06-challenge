// Global variables

var cityInputEl = document.querySelector("#city");
var cityHistoryButtonsEl = document.querySelector("#city-history");

// var city = [];

var lat;
var lon;

// API key
const APIkey = '66b78b76cf28151458f6e4a1d8e96fc6';

var cityFormEl = document.querySelector("#city-search");

/*
function init()
{
    if (localStorage.getItem("Cities") !== null)
    {
        storedCities = localStorage.getItem("Cities");

        var cities = JSON.parse(storedCities);
    
        console.log(cities);
    
        getCityHistory(cities);
    }
}

function getCityHistory(cities)
{
    for (var i = 0; i < 1; i++)
    {
        var button = document.createElement("button");

        button.textContent = cities.name;

        button.setAttribute("type", "submit");
        button.setAttribute("class", "col-12 btn btn-primary mt-2");

        cityHistoryButtonsEl.appendChild(button);
    }
}
*/

function getLocation(city)
{
    var currentCity = city;

    var geocodingRequestURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + currentCity.name + '&limit=1&appid=' + APIkey;

    fetch(geocodingRequestURL)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data);

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

    var weatherRequestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey;
    
    fetch(weatherRequestURL)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data);
        });
}

cityFormEl.addEventListener("submit", function(event)
{
    event.preventDefault();

    // console.log(event);

    var city = {
        name: cityInputEl.value,
        date: '',
        icon: '',
        tempurature: '',
        humidity: '',
        windSpeed: ''
    }

    // city.push(cityInputEl.value);

    console.log(city);

    localStorage.setItem("Cities", JSON.stringify(city));

    getLocation(city);
});

// init();