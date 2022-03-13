const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
const searchBox = document.querySelector('.search-box');
const errorMsg = document.querySelector('.error-msg');

searchBox.addEventListener('keypress',setQuery);

function setQuery(event){
    if(event.keyCode == 13){
        getResults(searchBox.value);
    }
}

function getResults(val){
fetch(`${api.base}weather?q=${val}&units=metric&appid=${api.key}`)
.then(weather => weather.json()
)
.then(response =>{
    displayResults(response);
})
.catch(() => {
    errorMsg.textContent = "Please search for a valid city 😩";
  });

  searchBox.value = '';
}

function displayResults(res){
    let city = document.querySelector('.location .city');
    city.innerText = `${res.name}, ${res.sys.country}`;

    let date = document.querySelector('.location .date');
    currentDate = new Date();
    date.innerText = dateBuilder(currentDate);

    let temp = document.querySelector('.current .temp');
   
    temp.innerHTML = `${Math.round(res.main.temp)}<span>°c</span>`;

    let weather = document.querySelector('.current .weather');
    weather.innerText = res.weather[0].main;

    let temp_range = document.querySelector('.hi-low');
    temp_range.innerText = `${Math.round(res.main.temp_min)}°C (min) / ${Math.round(res.main.temp_max)}°C (max)`;
    
}

function dateBuilder(dt){
    let mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May','June','july','aug','sept','oct','nov','dec'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','fFridayri','Saturday'];
    let date, day, month, year;

    day = days[dt.getDay()];
    month = mon[dt.getMonth()];
    year = dt.getFullYear();
    date = dt.getDate();

    return `${day} ${date} ${month} ${year}`
    
}