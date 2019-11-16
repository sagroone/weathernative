const weatherItems = document.querySelector('.weather-items');

const weeksList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const monthsList = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
];

function createWeatherItem(city, cnt, units) {
    weatherItems.classList.remove('show')

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.open( "GET", `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${city}&cnt=${cnt}&units=${units}` );
    xhr.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "e09f1511e5mshdddd0499fd70955p1c78b3jsn3b1446a6f346");

    xhr.send( null );
    xhr.onload = function () {
        let props = JSON.parse( xhr.responseText );


        setTimeout(function(){
            weatherItems.classList.add('show')
            weatherItems.innerHTML = ''
            for ( let i = 0; i < props.list.length; i++ ) {
                let weatherItem = renderWeatherItem( props, i);
                weatherItems.innerHTML += weatherItem;
            }
        },400)
    }
}

function renderWeatherItem( props, i ) {
    let local = localStorage.getItem('units');
    let un = local == 'metric' ? 'C' : 'F';

    const day = props.list[i];
    const { temp : { min, max } } = day;
    
    const convertDate = new Date(day.dt * 1000)
    const whichDate = (i == 0) ? 'Today' : `<p>${weeksList[convertDate.getDay()]}</p>
                                            <p>${convertDate.getDate()} ${monthsList[convertDate.getMonth()]} ${convertDate.getFullYear()} </p>`;
    return `
        <div class="weather-item ${i == 0 ? 'active' : ''}">
            <div class="weather-item__ico">
                <object type="image/svg+xml" data="./img/svg/${day.weather[0].icon}.svg"></object>
            </div>
            <div class="weather-item__min-max"> ${addPlus(Math.floor(min))}-${Math.floor(max)}<span class="cel">${un}</span></div>
            <div class="weather-item__day">${whichDate}</div>
        </div>
    `;
}

function addPlus(num) {
    return ( num > 0 ) ? '+' + Math.floor(num) : Math.floor(num);
}

export default createWeatherItem