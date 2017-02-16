(function() {

  function saveWeather(weather) {
    var dataObj = {};
    dataObj['weather'] = weather;
    chrome.storage.sync.set({'weather':weather}, function() {
      // saved yay
    });
  }

  function getWeather() {
    navigator.geolocation.getCurrentPosition((data) => {
      location_string = data.coords.latitude + "," + data.coords.longitude;
      $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + data.coords.latitude + "&lon=" + data.coords.longitude + "&APPID=79e05106eb6c4ec13b68e9e28ba22b10&units=imperial", (weather) => {
        saveWeather(weather)
      })
    });
    setTimeout(getWeather, 600000);
  }

  getWeather();
})();
