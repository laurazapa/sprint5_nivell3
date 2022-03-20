"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// API urls
const APIurls = ['https://icanhazdadjoke.com/', 'https://api.chucknorris.io/jokes/random'];
const myInit = {
    headers: { 'Accept': 'application/json' }
};
// https://tenor.com/view/celery-gif-11290748
/*******************************************/
// get button to call next joke and add click event
const nextJokeButton = document.getElementById('nextJokeButton');
nextJokeButton === null || nextJokeButton === void 0 ? void 0 : nextJokeButton.addEventListener('click', nextJoke);
// function that fetches the API to get a joke
function nextJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        // get random number between 0 and 1 to select a random url from APIurls
        const rndInt = Math.round(Math.random());
        let response = yield fetch(APIurls[rndInt], myInit);
        let joke = yield response.json();
        let jokep = document.getElementById('joketext');
        if (rndInt == 0) {
            jokep.innerHTML = joke.joke;
        }
        else {
            jokep.innerHTML = joke.value;
        }
        //change bg
        let int = Math.floor(Math.random() * (7 - 1 + 1) + 1);
        console.log(int);
        let containerall = document.getElementById('containerall');
        containerall === null || containerall === void 0 ? void 0 : containerall.setAttribute('style', `background-image: url('svg/blob${int}.svg');`);
    });
}
/****************************************** */
//create joke class
class Joke {
    //construct
    constructor(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}
const reportAcudits = [];
const ratingButtons = document.querySelectorAll('.rateButton');
for (let ratingButton of ratingButtons) {
    ratingButton.addEventListener('click', vauleJoke);
}
function vauleJoke(event) {
    var _a;
    let idButtonPressed = event.target.id;
    let score = 0;
    switch (idButtonPressed) {
        case 'badButton':
            score = 1;
            break;
        case 'normalButton':
            score = 2;
            break;
        case 'goodButton':
            score = 3;
            break;
        default:
            return 'No button pressed';
    }
    let joke = (_a = document.getElementById('joketext')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    let date = (new Date()).toISOString();
    let newJoke = new Joke(joke, score, date);
    reportAcudits.push(newJoke);
    console.log(reportAcudits);
}
/*************************************** */
// get weather
// const APIweatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
const APIweatherKey = 'aee177c467100e7458a1fd62845ff423';
const waether_info = document.getElementById('waether_info');
const weather_image = document.getElementById('weather_image');
navigator.geolocation.getCurrentPosition(getWeather, () => {
    var _a;
    // console.log('Not allowed');
    // waether_info!.innerHTML = 'Weather not available because you did not allow your browser to know your current location :(';
    (_a = document.getElementById('div_weather')) === null || _a === void 0 ? void 0 : _a.setAttribute('style', 'display: none');
});
function getWeather(position) {
    return __awaiter(this, void 0, void 0, function* () {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        let apiUrlWeatherComplete = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIweatherKey}`;
        // console.log(apiUrlWeatherComplete);
        let response = yield fetch(apiUrlWeatherComplete);
        let weatherResponse = yield response.json();
        let weather_icon = weatherResponse.weather[0].icon;
        let temperature = Math.round(weatherResponse.main.temp - 273.15); //temperature in K, converted to C
        waether_info.innerHTML = temperature + 'ºC';
        weather_image === null || weather_image === void 0 ? void 0 : weather_image.setAttribute('src', `http://openweathermap.org/img/wn/${weather_icon}@2x.png`);
    });
}
//# sourceMappingURL=app.js.map