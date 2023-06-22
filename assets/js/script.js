// Global variables

var cityInputEl = document.querySelector("#city");
var cityHistoryButtonsEl = document.querySelector("#city-history");

var city = [];

var lat;
var lon;

const APIkey = '66b78b76cf28151458f6e4a1d8e96fc6';

var cityFormEl = document.querySelector("#city-search");

function init()
{
    storedCities = localStorage.getItem("Cities");

    city = JSON.parse(storedCities);

    console.log(city);

    getCityHistory();
}

function getCityHistory()
{
    for (var i = 0; i < city.length; i++)
    {
        var button = document.createElement("button");

        button.textContent = city[i];

        button.setAttribute("type", "submit");
        button.setAttribute("class", "col-12 btn btn-primary mt-2");

        cityHistoryButtonsEl.appendChild(button);
    }
}

function getWeather()
{
    var currentCity = city[city.length - 1];

    var geocodingRequestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + currentCity + ',&limit=1&appid=' + APIkey;
    var weatherRequestURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey;

    fetch(geocodingRequestURL)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data);
        });
    
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

    console.log(event);

    city.push(cityInputEl.value);

    console.log(city);

    localStorage.setItem("Cities", JSON.stringify(city));
});

init();