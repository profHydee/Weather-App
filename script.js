var cityInput = document.querySelector(".inputs input");
var showWeatherbutton = document.querySelector("button");
var cityName = document.querySelector(".result h1");
var weatherInfo = document.querySelectorAll(".result h3");
var weatherAPIkey = "d0745bc39b3d554c1ad43aac7971f790";

showWeatherbutton.addEventListener("click", showWeather);

function showWeather(){
  var mainCityName = cityInput.value;
  if(mainCityName.trim().length === 0)
  {
    return alert("City name cannot be empty");
  };
  
  var xml = new XMLHttpRequest();
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+mainCityName+"&units=metric&appid="+weatherAPIkey;
  var method = "GET";

  xml.open(method, url);
  xml.onreadystatechange = function() {
    if(xml.readyState === 4 && xml.status === 200){
      var weatherDetails = JSON.parse(xml.responseText);
      
      var newWeather = new weather(mainCityName, weatherDetails.weather[0].description.toUpperCase())
      newWeather.temperature = weatherDetails.main.temp;
      cityName.textContent = newWeather.city;
      weatherInfo[0].textContent = `${newWeather.description}` 
      weatherInfo[1].textContent = `${newWeather.temperature}`;
    }
    else if(xml.readyState === 4 && xml.status !== 200){
      return ("Something is wrong");
    }
  }
  xml.send();
}

function weather(city, description){
  this.city = city;
  this.description = description;
  this._temperature ="";
}

Object.defineProperty(weather.prototype, "temperature", {
  get: function(){
    return this._temperature;
  },
 set: function(value){
   return this._temperature = ((value * 1.8) + 32).toFixed()+"F";
 }
});