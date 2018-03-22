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
  //caches desired data
  function sortWeather(weatherData){
    var mainData = weatherData.query.results.channel;
    var atmosphereData = mainData.atmosphere;
    var location = mainData.location;
    var wind = mainData.wind;
    var currentCondition = mainData.item.condition;
    var high = mainData.item.forecast[0].high;
    var low = mainData.item.forecast[0].low;
    console.log(mainData);
    postWeather(location, currentCondition, wind, atmosphereData, high, low);
  }
  //posts to page
  function postWeather(location, currentCondition, wind, atmosphereData, high, low){
    $("h1").text(location.city + ", " + location.region);
    $("#temp").before("<h3>" + currentCondition.text + "</h3>");
    $("#temp").text(currentCondition.temp + "°F");
    $("#high").text(high + "°F");
    $("#low").text(low + "°F");
    
  }
  //wrapper
  function init(){
    getLocation();
  }
  //run it
  $(init);