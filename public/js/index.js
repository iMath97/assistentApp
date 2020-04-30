document.addEventListener("DOMContentLoaded", function(){
    // showLogo();
});

// show white or black logo depending on background-color
const WHITE_LOGO = document.querySelector("#whiteLogo");
const BLACK_LOGO = document.querySelector("#blackLogo");
function showLogo(){
    BLACK_LOGO.style = "display: none";
}


const paidUser = false;

if(paidUser){
    // geolocation
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            getweather(lat, lon);
        });
    }

    // get weather by geolocation
    async function getweather(lat, lon){
        try {
            const url = `weather/geolocation/${lat},${lon}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            render(data);
        } catch (error) {
            console.log('Error!');
            console.error(error);
        }
    }
} else {
    // country
    getWeatherByCountry("brussels, BE");

    // get weather by country
    async function getWeatherByCountry(city, country){
        try{
            const url = `weather/country/${city},${country}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            render(data);
        }catch (error) {
            console.log('Error!');
            console.error(error);
        }
    }
}

function render(data){
    // render info
    const location = `${data.name}, ${data.sys.country}`;

    // top section
    const minTemp = Math.round(`${data.main.temp_min}`);
    let maxTemp = Math.round(`${data.main.temp_max}`);
    const temp = Math.round(`${data.main.temp}`);
    const windspeed = `${data.wind.speed}`;
    const humidity = `${data.main.humidity}`;
    const visibility = `${data.visibility}`;
    const visibilitykm = visibility/1000;
    

    $("#maxTemp").text(`${maxTemp}\xB0C`);
    $("#minTemp").text(`${minTemp}\xB0C`);
    $("#mainTemp").text(`${temp}\xB0C`);
    $("#windspeed").text(windspeed);
    $("#humidity").text(`${humidity}%`);

    if(visibility >= 1000){
        $("#visibility").text(`${visibilitykm} KM`);
    } else {
        $("#visibility").text(`${visibility} M`);
    }
    

    // description
    const desc1 = `${data.weather[0].main}`;
    const desc2 = `${data.weather[0].description}`;

    $("#description1").text(desc1);
    $("#description2").text(desc2);

    // bottom section


    $(".location").text(location);


    // render background
    let descriptionWeather = data.weather[0].main;
    descriptionWeather = descriptionWeather.toLowerCase();

    switch (descriptionWeather) {
        case 'thunderstorm':
            $("body").css("background-image", "url('../images/weather/lightning.jpg')");
            break;
        case 'drizzle':
        case 'rain':
            $("body").css("background-image", "url('../images/weather/rain.jpg')");
            break;
        case 'snow':
            $("body").css("background-image", "url('../images/weather/snow.jpg')");
            break;
        case 'clear':
            $("body").css("background-image", "url('../images/weather/sunny.jpg')");
            break;
        case 'clouds':
            $("body").css("background-image", "url('../images/weather/clouds.jpg')");
            break;
        default:
            $("body").css("background-image", "url('../images/weather/sunny.jpg')");
            break;
    }

    // weather icon
    const baseurl = "http://openweathermap.org/img/w/";
    let weatherIcon = `${baseurl}${data.weather[0].icon}.png`;
    $("#weatherIcon").attr("src", `${weatherIcon}`);
    
    // render winddirection
    let winddirection = `${data.wind.deg}`;

    const WIND_DIRECTION_COUNTRY = {
        BE: ["N", "NO", "O", "ZO", "Z", "ZW", "W", "NW"],
        EN: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    };

    if(winddirection >= 345 && winddirection < 15){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[0]);
    }else if(winddirection >= 15 && winddirection < 75){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[1]);
    }else if(winddirection >= 75 && winddirection < 115){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[2]);
    }else if(winddirection >= 115 && winddirection < 165){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[3]);
    }else if(winddirection >= 165 && winddirection < 205){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[4]);
    }else if(winddirection >= 205 && winddirection < 255){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[5]);
    }else if(winddirection >= 255 && winddirection < 285){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[6]);
    }else if(winddirection >= 285 && winddirection < 345){
        $("#windDirection").text(WIND_DIRECTION_COUNTRY.EN[7]);
    }
}
