
//the following sections updates the ID: #cur-day-time with the current information
//the date/time if formatted: DAY, MONTH DATE, HOUR:MINUTE AM/PM

//this function determines if the hour is AM or PM
function defineAM_PM () {
    let time = new Date;
    let defineTime = time.getHours();
    if (defineTime < 11) {
        return "AM"
    } else {
        return "PM"
    }
}

//this function reformats a leading 0 in minute indeces LESS THAN 10
function fixMinutes () {
    let time = new Date;
    let minutes = time.getMinutes()

    if (minutes < 10) {
        return `0${minutes}`
    } else {
        return `${minutes}`
    }
}

//this function generates remaining date data and returns fully formatted date display
function showDayTime (date) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    let currentDay = days[date.getDay()];
    let currentMonth = months[date.getMonth()]
    let currentDate = date.getDate()
    let currentHour = hours[date.getHours()]
    let currentMinute = fixMinutes()
    let am_or_pm = defineAM_PM()

    let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}${am_or_pm}`
    return formattedDate
}

let dateDisplay = document.querySelector("#cur-day-time");
dateDisplay.innerHTML = showDayTime(new Date)


//this section updates the Current Temperature & City through API
function getCLInfo (response) {
    console.log(response.data)
    let oldTemp = document.querySelector("#cur-temp");
    let newTemp = response.data.main.temp;
        newTemp =  newTemp.toFixed(0)
        newTemp = `${newTemp}°F`
    oldTemp.innerHTML = newTemp;

    let newCity = response.data.name
    let oldCity = document.querySelector("#selected-city");
    document.querySelector("#entry-line").value = ""
    oldCity.innerHTML = newCity
}

//this function sends Geo-Location LAT and LON data to API Weather        
function determinePosition (position) {
    let apiKey = `a20670b64f2243817bd352afb3a3d0b5`;
    let lat = position.coords.latitude;
    let lon = position.coords.longitude

    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    axios.get(url).then(getCLInfo)
}

//this function intiates the Geo-Location grab
function getPosition(event){
    event.preventDefault ();
    navigator.geolocation.getCurrentPosition(determinePosition);
}
        
//this is the Event Listener button for the Current Location Button
let currentLocation = document.querySelector("#current-location-button")
currentLocation.addEventListener("click", getPosition)


//this section updates the current temperature through API
function getTemperature (response) {
    let oldTemp = document.querySelector("#cur-temp");
    let newTemp = response.data.main.temp;
        newTemp =  newTemp.toFixed(0)
        newTemp = `${newTemp}°F`
    oldTemp.innerHTML = newTemp;
}


//the following section refines the functionality of the ID: #entry-line
//the submission of a new city updates the ID: "#selected-city" 
function updateCity(event) {
    event.preventDefault ();
    let newCity = document.querySelector("#entry-line").value;
        newCity = newCity.trim()
        newCity = newCity.charAt(0).toUpperCase() + newCity.slice(1)
    let oldCity = document.querySelector("#selected-city");
    document.querySelector("#entry-line").value = ""
    oldCity.innerHTML = newCity
        
    //this piece retriggers the updating of the current date
    dateDisplay = document.querySelector("#cur-day-time");
    dateDisplay.innerHTML = showDayTime(new Date)
        
    //this piece launches updateTemp
    let apiKey = `a20670b64f2243817bd352afb3a3d0b5`
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${apiKey}`;
    axios.get(url).then(getTemperature)
}

//this is the Event Listener button for the Change City Button
let changeCity = document.querySelector("#submit-button")
changeCity.addEventListener("click", updateCity)


//the function converts the Current Temperature into Fahrenheit (if it is in Celsius)
function calculateFahrenheit () {
    let currentTempUnit = document.querySelector("#cur-temp").innerHTML;
    
    let tempLen = currentTempUnit.length-2;    
    let currentTemp = currentTempUnit.substring(0, tempLen)
   
    let newTemp = (currentTemp * (9/5) + 32);
    newTemp = newTemp.toFixed(0);
    
    let newTempUnit = `${newTemp}°F`
    document.querySelector("#cur-temp").innerHTML = `${newTempUnit}`
}

//the function converts the Current Temperature into Celsius (if it is in Fahrenheit)
function calculateCelsius () {
    let currentTempUnit = document.querySelector("#cur-temp").innerHTML;
    
    let tempLen = currentTempUnit.length-2;    
    let currentTemp = currentTempUnit.substring(0, tempLen);

    let newTemp = (currentTemp - 32) * (5/9);
    newTemp = newTemp.toFixed(0);

    let newTempUnit = `${newTemp}°C`;
    document.querySelector("#cur-temp").innerHTML = `${newTempUnit}`
}

//the function looks to confirm if the Current Temperature is in Fahrenheit
function confirmUnitF (event) {
    let currentTempUnit = document.querySelector("#cur-temp").innerHTML;
    let currentUnit = currentTempUnit.slice(-1);

    if (currentUnit === "F") {
        calculateCelsius ()
    } else {}
}

//the function looks to confirm if the Current Temperature is in Celsius
function confirmUnitC (event) {
    let currentTempUnit = document.querySelector("#cur-temp").innerHTML;
    let currentUnit = currentTempUnit.slice(-1);

    if (currentUnit === "C") {
        calculateFahrenheit ()
    } else {}
}

//this is the Event Listener button for the Fahrenheit to Celcius Conversion process
let buttonConverterC = document.querySelector("#celsius")
buttonConverterC.addEventListener("click", confirmUnitF)

//this is the Event Listener button for the Celsius to Fahrenheit Conversion process
let buttonConverterF = document.querySelector("#fahrenheit")
buttonConverterF.addEventListener("click", confirmUnitC)


