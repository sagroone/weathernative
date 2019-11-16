const location = document.querySelector('.location');

const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const weeksList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

function showLocationInfo( props ) {
    location.classList.remove('show');

    setTimeout(() => {
        location.classList.add('show');
        const { name, sys : {country}, dt } = props;
        let timeStamp = (dt + props.timezone) * 1000 ;
        const dateNow = new Date(timeStamp);
        const year = dateNow.getFullYear();
        const month = dateNow.getMonth();
        const day = dateNow.getDate()
        const weekDay = dateNow.getDay();
        const hours = dateNow.getUTCHours();
        const minutes = dateNow.getMinutes();
 
        location.innerHTML = renderLocationInfo( name,country, year, month, day, weekDay, hours, minutes );
    }, 300)

   
}

function renderLocationInfo( name,country, year, month, day, weekDay, hours, minutes ) {
    return `
        <div class="geoposition">
            <p class="geoposition__city">${name},</p>
            <p class="geoposition__country">${country}</p>
        </div>
        <div class="date">
            <span class="date__time">${addZero(hours)}:${addZero(minutes)}</span>
            <span class="date__weeks-day">${weeksList[weekDay]},</span>
            <span class="date__num-day">${day}</span>
            <span class="date__month">${monthsList[month]}</span>
            <span class="date__year">${year}</span>
        </div>
    `;
}

function addZero(num) {
    return (num <= 9) ? '0' + num : num
}

export default showLocationInfo