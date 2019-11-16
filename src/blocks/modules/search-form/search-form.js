import showLocationInfo from '../location/location';
import showCurrentWeather from '../weather-now/weather-now';
import createWeatherItem from '../weather-item/weather-item';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-form__input');


let city;

searchInput.addEventListener('focus', moveLabel);
searchInput.addEventListener('blur', moveLabel);

localStorage.setItem('units', 'metric');

searchInput.addEventListener('keypress', function (e) {

    let units = localStorage.getItem('units');

    if (e.key == 'Enter' && this.value != '') {
        city = this.value;
        changeUnits(city, units);
    }
});

function moveLabel() {
    return (this.value == '') ? searchForm.classList.toggle('focus') : null;
};

function changeUnits(city, units) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.open("GET", `https://community-open-weather-map.p.rapidapi.com/weather?units=${units}&mode=json&q=${city}`);
    xhr.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "e09f1511e5mshdddd0499fd70955p1c78b3jsn3b1446a6f346");
    xhr.send(null);
    xhr.onload = function () {
        let obj = JSON.parse(xhr.responseText);
        if (obj.cod == '404') {
            searchInput.classList.add('error');
            return;
        } else {
            searchInput.classList.remove('error');
            document.querySelector('#root').classList.add('active');

            showLocationInfo(obj);
            showCurrentWeather(obj);
            createWeatherItem(city, 7, units);

            setTimeout(() => {
                activateChangeUnits()
            }, 500)
            
        }
    };
    
};

function activateChangeUnits() {
    let unitsBlock = document.querySelectorAll('.current-deg__units');


    for ( let i = 0; i < unitsBlock.length; i++) {
        unitsBlock[i].addEventListener('click', function() {

            const units = this.getAttribute('data-units');
            localStorage.setItem('units', units);
            changeUnits(city, units);
        })
    }
}
