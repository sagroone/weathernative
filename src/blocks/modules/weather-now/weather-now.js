const weatherNowBlock = document.querySelector('.weather-now')

function showCurrentWeather( props ) {

    weatherNowBlock.classList.remove('show');

    
    setTimeout(() => {
        weatherNowBlock.classList.add('show');
        weatherNowBlock.innerHTML = renderCurrentWeather( props );
    }, 500)
    
}

function renderCurrentWeather( props ) {

    let local = localStorage.getItem('units');
    let un = local == 'metric' ? 'C' : 'F';
    
    const temp = Math.floor(props.main.temp);
    const description = props.weather[0].description.slice(0,1).toUpperCase() + props.weather[0].description.slice(1);
    const min = Math.floor(props.main.temp_min);
    const max = Math.floor(props.main.temp_max);

    let cel = (localStorage.getItem('units') == 'metric') ? 'active' : '';
    let far = (localStorage.getItem('units') == 'imperial') ? 'active' : '';

    return `
        <div class="weather-now__ico">
            <object type="image/svg+xml" data="./img/svg/${props.weather[0].icon}.svg"></object>
        </div>
        <div class="weather-now__info">
            <div class="whole-day">
                <div class="whole-day__min">Min ${addPlus(min)} <span class="cel">${un}</span></div>
                <div class="whole-day__max">Max ${addPlus(max)} <span class="cel">${un}</span></div>
            </div>
            <div class="current-deg">
                <span class="current-deg__num">${addPlus(temp)}</span>
                <span data-units="metric" class="current-deg__units ${cel}">C</span>
                <span data-units="imperial" class="current-deg__units ${far}">F</span>
            </div>
            <div class="weather-conditions">${description}</div>
        </div>
    `;
}

function addPlus(num) {
    return ( num > 0 ) ? '+' + num : num;
}

export default showCurrentWeather;