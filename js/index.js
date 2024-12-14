//=======================================================global========================================================//
var search = document.getElementById("search");

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//=======================================================global========================================================//
async function searching(key) {
    if (!key || key.length < 2) {
        return; 
    }
            var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=04829fc7d84c4de88bb15515241312&q=${key}&days=3`);
            var data = await response.json() ;
            // console.log(data);
                displayCurrentDay(data);
                displayNextDay(data.forecast.forecastday[1], "mid-header");
                displayNextDay(data.forecast.forecastday[2],"date");
}
function displayCurrentDay(data) {
    if (data != null) {
        const date =new Date(data.current.last_updated.replace(" ", "T"));
        var today = `<div class="forecast-header bg-date d-flex justify-content-between p-2 my-text" id="today">
          <div class="day">${days[date.getDay()]}</div>
          <div class=" date">${date.getDate()}${ months[date.getMonth()]}</div>
          </div>
          <div class="forecast-content py-4 px-3  family " id="current">
          <div class="location my-text">${data.location.name}</div>
          <div class="degree">
              <div class="num  fs-1 text-white fw-bold">${ data.current.temp_c}<sup>o</sup>C</div>
            
              <div class="forecast-icon">
                  <img src="https:${ data.current.condition.icon}" alt="" width="90">
              </div>
              </div>
            <div class="custom sky-text my-3">${data.current.condition.text}</div>
            <span class="me-3 my-text"><img src="images/icon-umberella@2x.png" width="21px" height="21px" class="me-1" alt="">${data.forecast.forecastday[0].day.daily_will_it_rain}%</span>
                        <span class="me-3 my-text"><img src="images/icon-wind@2x.png" width="21px" height="21px" class="me-1" alt="">${data.current.wind_kph}km/h</span>
                        <span class="me-3 my-text"><img src="images/icon-compass@2x.png" width="21px" height="21px"class="me-1" alt="">${windDirection(data.current.wind_dir)}</span>
            </div>`
        document.getElementById("weatherToday").innerHTML = today;
        }
}
function displayNextDay(info, id_color) {
    if (info != null) {
        var nextDay = `<div class="forecast-header">
        <div class="day p-2 my-text text-center bg-${id_color} ">
        ${days[new Date(info.date.replace(" ", "T")).getDay()]}</div>
    </div>
    <div class="forecast-content my-text text-center pt-5 px-3 pb-1">
        <div class="forecast-icon mb-3">
            <img src="https:${info.day.condition.icon}" alt="" width="48">
        </div>
        <div class="degree text-white fs-3 fw-bold">${info.day.maxtemp_c}<sup>o</sup>C</div>
        <small>${info.day.mintemp_c}<sup>o</sup></small>
        <div class="custom my-3 sky-text">${info.day.condition.text}</div>
    </div>`
    document.getElementById(`${id_color}`).innerHTML = nextDay;  
    }
}
function windDirection(direct) {
    var wind="";
    switch (direct) {
            case "N":
            wind = "NORTH";
            break;
            case "NNE":
            wind = "NORTH EAST";
            break;
            case "ENE":
            wind = "NORTH EAST";
            break;
            case "NE":
                wind = "NORTH EAST";
            break;
            case "E":
                wind = "EAST";
            break;
            case "ESE":
                wind = "SOUTH EAST";
            break;
            case "SE":
                wind = "SOUTH EAST";
            break;
            case "SSE":
                wind = "SOUTH EAST";
            break;
            case "S":
                wind = "SOUTH";
            break;
            case "SSW":
                wind = "SOUTH WEST";
            break;
            case "SW":
                wind = "SOUTH WEST";
            break;
            case "WSW":
                wind = "SOUTH WEST";
            break;
            case "W":
                wind = "WEST";
            break;
            case "WNW":
                wind = "NORTH WEST";
            break;
            case "NW":
                wind = "NORTH WEST";
            break;
            case "NNW":
                wind = "NORTH WEST";
            break;

    }
    return wind;

}
searching("Liverpool"); 
search.addEventListener("input", function () { searching(this.value)})
//==========================================================end=================================================//






