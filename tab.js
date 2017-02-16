(function(bookmarkFolder, displayFavicons) {

  function setColors(textColor, bodyColor) {
    $('body').css('background', bodyColor).css('color', textColor);
  }

  function updateColors() {
    var now = new Date();
    var hr = now.getHours();
    // night mode
    if (hr > 18 || hr < 6) {
      textColor = "#f1f1f1";
      bodyColor = "#0c0c0c";
    } else {
      textColor = "#191919";
      bodyColor = "#fff";
    }
    setColors(textColor, bodyColor);
  }

  function updateClock() {
    Date.getMinutesTwoDigits = function() {
      var retval = now.getMinutes();
      if (retval < 10) return ("0" + retval.toString());
      else return retval.toString();
    }
    Date.getHoursModTwelve = function() {
      var retval = now.getHours();
      retval = retval%12;
      if (retval == 0) retval = 12;
      return retval;
    }
    var now = new Date(),
    time = Date.getHoursModTwelve() + ':' + Date.getMinutesTwoDigits();
    document.getElementById('time').innerHTML = ["", time].join('');
    updateColors();
    setTimeout(updateClock, 1000);
  }

  function updateWeatherText(temp = "", weather = "", city = "") {
    if (temp === "") {
      $('#weather')[0].innerHTML = "No weather data"
    } else {
      $('#weather')[0].innerHTML = "<b>" + temp +"</b> and <b>" + weather + "</b> in " + city
    }
  }

  function getWeather() {
    chrome.storage.sync.get('weather', function(result) {
      if (result.weather != undefined) {
        updateWeatherText(result.weather.main.temp, result.weather.weather[0].description, result.weather.name)
      }
      else {
        updateWeatherText()
      }
    });
    setTimeout(getWeather, 600000)
  }

  updateClock();
  getWeather();
})('Favorites', false);
