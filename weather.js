const weather = document.querySelector(".js-weather")

const API_KEY = "c6aefbcd87a732183078e13f2a02e805";
// openweathermap에서 받음
const COORDS = 'coords';

function getWeather(latitude, longitude){
    // network에서 받아왔는지 확인 가능
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function GeoSuccess(position){
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    // latitude = latitude, longitude = longitude 생략가능
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function GeoFail(){
    console.log("Can't access");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(GeoSuccess, GeoFail);
    // API 사용
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords(); 
    } 
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        // LS에 저장된 값을 parse해서 가져옴
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();