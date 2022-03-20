// API urls
const APIurls = ['https://icanhazdadjoke.com/', 'https://api.chucknorris.io/jokes/random'];
const myInit = {
        headers: {'Accept':'application/json'}
};

// https://tenor.com/view/celery-gif-11290748


/*******************************************/

// get button to call next joke and add click event
const nextJokeButton = document.getElementById('nextJokeButton');
nextJokeButton?.addEventListener('click', nextJoke);

// function that fetches the API to get a joke
async function nextJoke(){

    // get random number between 0 and 1 to select a random url from APIurls
    const rndInt = Math.round(Math.random());

    let response = await fetch(APIurls[rndInt], myInit);
    let joke = await response.json();
    let jokep = document.getElementById('joketext');
    if(rndInt == 0){
        jokep!.innerHTML = joke.joke;
    }else{
        jokep!.innerHTML = joke.value;
    }

    //change bg
    let int = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    console.log(int);
    let containerall = document.getElementById('containerall');
    containerall?.setAttribute('style', `background-image: url('svg/blob${int}.svg');`);
}

/****************************************** */
//create joke class
class Joke {
    //properties
    public joke: String;
    public score: Number;
    public date: String;

    //construct
    constructor(joke: String, score: Number, date: String){
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
}

const reportAcudits: Joke[] = [];

const ratingButtons = document.querySelectorAll('.rateButton');
for(let ratingButton of ratingButtons){
    ratingButton.addEventListener('click', vauleJoke);
}

function vauleJoke(event: any){
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
    let joke = document.getElementById('joketext')?.innerHTML;
    let date = (new Date()).toISOString();
    let newJoke = new Joke(joke!, score, date);
    reportAcudits.push(newJoke);

    console.log(reportAcudits);

}

/*************************************** */
// get weather
// const APIweatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
const APIweatherKey = 'aee177c467100e7458a1fd62845ff423';
const waether_info = document.getElementById('waether_info');
const weather_image = document.getElementById('weather_image');

navigator.geolocation.getCurrentPosition( getWeather , () => {
    // console.log('Not allowed');
    // waether_info!.innerHTML = 'Weather not available because you did not allow your browser to know your current location :(';
    document.getElementById('div_weather')?.setAttribute('style', 'display: none');
});

async function getWeather(position: any){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    let apiUrlWeatherComplete = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIweatherKey}`;

    // console.log(apiUrlWeatherComplete);

    let response = await fetch(apiUrlWeatherComplete);
    let weatherResponse = await response.json();
    let weather_icon = weatherResponse.weather[0].icon;
    let temperature = Math.round(weatherResponse.main.temp - 273.15); //temperature in K, converted to C

    
    waether_info!.innerHTML = temperature + 'ºC';
    weather_image?.setAttribute('src', `http://openweathermap.org/img/wn/${weather_icon}@2x.png`);

}