//grab geolocation
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      // console.log(lat, lon);
      getWeather(lat, lon);
    });
  }
}
//get weather object from yahoo
function getWeather(lat, lon){
  $.ajax({
    type: "GET",
    url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" + lat +"%2C" + lon + ")%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    success: function(weatherData){
      sortWeather(weatherData);
    }
  });
}
//switch to match weather icons from github/yahoo weather api
function setWeatherIcon(condid) {
  var icon = '';
      switch(condid) {
        case '0': icon  = 'wi-tornado';
          break;
        case '1': icon = 'wi-storm-showers';
          break;
        case '2': icon = 'wi-tornado';
          break;
        case '3': icon = 'wi-thunderstorm';
          break;
        case '4': icon = 'wi-thunderstorm';
          break;
        case '5': icon = 'wi-snow';
          break;
        case '6': icon = 'wi-rain-mix';
          break;
        case '7': icon = 'wi-rain-mix';
          break;
        case '8': icon = 'wi-sprinkle';
          break;
        case '9': icon = 'wi-sprinkle';
          break;
        case '10': icon = 'wi-hail';
          break;
        case '11': icon = 'wi-showers';
          break;
        case '12': icon = 'wi-showers';
          break;
        case '13': icon = 'wi-snow';
          break;
        case '14': icon = 'wi-storm-showers';
          break;
        case '15': icon = 'wi-snow';
          break;
        case '16': icon = 'wi-snow';
          break;
        case '17': icon = 'wi-hail';
          break;
        case '18': icon = 'wi-hail';
          break;
        case '19': icon = 'wi-cloudy-gusts';
          break;
        case '20': icon = 'wi-fog';
          break;
        case '21': icon = 'wi-fog';
          break;
        case '22': icon = 'wi-fog';
          break;
        case '23': icon = 'wi-cloudy-gusts';
          break;
        case '24': icon = 'wi-cloudy-windy';
          break;
        case '25': icon = 'wi-thermometer';
          break;
        case '26': icon = 'wi-cloudy';
          break;
        case '27': icon = 'wi-night-cloudy';
          break;
        case '28': icon = 'wi-day-cloudy';
          break;
        case '29': icon = 'wi-night-cloudy';
          break;
        case '30': icon = 'wi-day-cloudy';
          break;
        case '31': icon = 'wi-night-clear';
          break;
        case '32': icon = 'wi-day-sunny';
          break;
        case '33': icon = 'wi-night-clear';
          break;
        case '34': icon = 'wi-day-sunny-overcast';
          break;
        case '35': icon = 'wi-hail';
          break;
        case '36': icon = 'wi-day-sunny';
          break;
        case '37': icon = 'wi-thunderstorm';
          break;
        case '38': icon = 'wi-thunderstorm';
          break;
        case '39': icon = 'wi-thunderstorm';
          break;
        case '40': icon = 'wi-storm-showers';
          break;
        case '41': icon = 'wi-snow';
          break;
        case '42': icon = 'wi-snow';
          break;
        case '43': icon = 'wi-snow';
          break;
        case '44': icon = 'wi-cloudy';
          break;
        case '45': icon = 'wi-lightning';
          break;
        case '46': icon = 'wi-snow';
          break;
        case '47': icon = 'wi-thunderstorm';
          break;
        case '3200': icon = 'wi-cloud';
          break;
        default: icon = 'wi-cloud';
          break;
      }
  
      return '<i class="wi '+icon+'"></i>';
}
//changes color of background depending on time of day
function changeColor(){
  var today = new Date();
  var hourNow = today.getHours();
  console.log(hourNow);
  if(hourNow > 18){
    $("body").addClass('evening');
  }
  else if(hourNow >= 12){
    $("body").addClass('afternoon');
  }
  else if (hourNow >= 6){
    $("body").addClass('morning');
  }
  else {
    $("body").addClass('night');
  }
}
//handles button toggles
function moreInfo(){
    $("#windBtn").on('click',function(){
      $("#atmosphere").hide();
      $("#forecast").hide();
      $("#wind").fadeToggle();
    });
    $("#atmosphereBtn").on('click',function(){
      $("#wind").hide();
      $("#forecast").hide();
      $("#atmosphere").fadeToggle();
    });
    $("#forecastBtn").on('click',function(){
      $("#wind").hide();
      $("#atmosphere").hide();
      $("#forecast").fadeToggle();
    });
}
function toCelcius(fahrenheit){
  var celcius = Math.round((5/9)*(fahrenheit - 32));
  return celcius;
}

//caches desired data
function sortWeather(weatherData){
  var mainData = weatherData.query.results.channel;
  var atmosphereData = mainData.atmosphere;
  var location = mainData.location;
  var wind = mainData.wind;
  var currentCondition = mainData.item.condition;
  var high = mainData.item.forecast[0].high;
  var low = mainData.item.forecast[0].low;
  var condid = mainData.item.condition.code;
  var foreCast = mainData.item.forecast;
  console.log(mainData);
  var icon = setWeatherIcon(condid);
  forecast(foreCast);
  postWeather(location, currentCondition, wind, atmosphereData, high, low, icon, foreCast);
}
function forecast(foreCast){
  $("#forecast > div:nth-child(1)").append("<h4>" + foreCast[1].day + "</h4>" + "<h5>" + foreCast[1].text + "</h5>" + setWeatherIcon(foreCast[1].code) + "<p>" + foreCast[1].high +"</p>");
  $("#forecast > div:nth-child(2)").append("<h4>" + foreCast[2].day + "</h4>" + "<h5>" + foreCast[2].text + "</h5>" + setWeatherIcon(foreCast[2].code) + "<p>" + foreCast[2].high +"</p>");
  $("#forecast > div:nth-child(3)").append("<h4>" + foreCast[3].day + "</h4>" + "<h5>" + foreCast[3].text + "</h5>" + setWeatherIcon(foreCast[3].code) + "<p>" + foreCast[3].high +"</p>");
}
//posts to page
function postWeather(location, currentCondition, wind, atmosphereData, high, low, icon, foreCast){
  $("h1").text(location.city + ", " + location.region);
  $("#temp").before("<h3>" + currentCondition.text + "</h3>");
  $("#temp").text(currentCondition.temp + String.fromCharCode(176) + "F").before(icon);
  $("#highLow").text(high + " | " + low);
  $("#wind").text("wind speed: " + wind.speed + "mph")
  
  $("#atmosphere").text("humidity: " + atmosphereData.humidity + "%");
  $("#c").on('click', function(){
    $("#c").hide();
    $("#f").fadeIn();
    $("#temp").text(toCelcius(currentCondition.temp) + String.fromCharCode(176) + "C");
    $("#highLow").text(toCelcius(high) + " | " + toCelcius(low));
    $("#forecast > div:nth-child(1) > p").text(toCelcius(foreCast[1].high));
    $("#forecast > div:nth-child(2) > p").text(toCelcius(foreCast[2].high));
    $("#forecast > div:nth-child(3) > p").text(toCelcius(foreCast[3].high));
  }); 
  $("#f").on('click', function(){
    $("#f").hide();
    $("#c").fadeIn();
    $("#temp").text(currentCondition.temp + String.fromCharCode(176) + "F");
    $("#highLow").text(high + " | " + low);
    $("#forecast > div:nth-child(1) > p").text(foreCast[1].high);
    $("#forecast > div:nth-child(2) > p").text(foreCast[2].high);
    $("#forecast > div:nth-child(3) > p").text(foreCast[3].high);
    
    
  }); 
}
//hides additional weather info
function hideEm(){
  $("#wind").hide();
  $("#atmosphere").hide();
  $("#forecast").hide();
  $("#f").hide();
}
//wrapper
function init(){
  getLocation();
  changeColor();
  hideEm();
  moreInfo();
}
//run it
$(init);