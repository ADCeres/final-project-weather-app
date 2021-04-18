
//the following sections updates the ID: #cur-day-time with the current information
//the date/time if formatted: DAY, MONTH DATE, HOUR:MINUTE AM/PM


//this function generates remaining date data and returns fully formatted date display



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
let buttonConverterF = document.querySelector("#fahrenheit");
buttonConverterF.addEventListener("click", confirmUnitC)



//This section of code updates all the weather stats for a user-entered city

    function updateTemp (newTemp) {
        let oldTemp = document.querySelector("#cur-temp");
            newTemp =  newTemp.toFixed(0)
            newTemp = `${newTemp}°F`
        oldTemp.innerHTML = newTemp;
    }

    function updateWeather (newWeather) {
        let oldWeather = document.querySelector("#cur-emoji-desc")
        oldWeather.innerHTML = newWeather
    }
        
    function updateEmoji (newWeather) {
        let newEmoji = document.querySelector("#cur-emoji")     

        switch (newWeather) {
        case "Clouds":
            newEmoji.innerHTML = "☁️";
            break;
        case "Rain":
            newEmoji.innerHTML = "🌧";
            break;
        case "Sunny":
            newEmoji.innerHTML = "☀️";
            break;
        case "Snow":
            newEmoji.innerHTML = "❄️";
            break;
        case "Extreme":
            newEmoji.innerHTML = "❗";
            break;
        case "Windy":
            newEmoji.innerHTML = "💨";
            break;
        case "Clear":
            newEmoji.innerHTML = "☀️";
            break;
        default:
            newEmoji.innerHTML = "❗❗";
            break;
        }
    }

    function updateWind (newWind) { 
        let oldWind = document.querySelector("#wind")
        newWind = newWind.toFixed(0)
        oldWind.innerHTML = `${newWind}mph`
    }   

    function updateHumidity (newHumidity) {
        let oldHumidity = document.querySelector("#humidity")
        oldHumidity.innerHTML = `${newHumidity}%`
    }

    function convertHour (hour) {
        let hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        return hours[hour]
    }

    function convertMinutes (minute) {
        if (minute < 10) {
            return `0${minute}`
        } else {
            return `${minute}`
        }
    }
    
    function defineAM_PM (hour) {
        if (hour < 11) {
            return "AM"
        } else {
            return "PM"
        }
    }

    function updateSunrise (newSunrise) {
        let oldSunrise = document.querySelector("#sunrise")
            newSunrise = newSunrise * 1000
            dateSunrise = new Date(newSunrise)
            hoursSunrise = dateSunrise.getHours()
            convertedHour = convertHour(hoursSunrise)
            minutesSunrise = dateSunrise.getMinutes()
            convertedMinute = convertMinutes(minutesSunrise)
            morningOrAfternoon = defineAM_PM(hoursSunrise)
            fullSunrise = `${convertedHour}:${convertedMinute}${morningOrAfternoon}`
            oldSunrise.innerHTML = fullSunrise
    }

    function updateSunset (newSunset) {
        let oldSunset = document.querySelector("#sunset")
            newSunset = newSunset * 1000
            dateSunset = new Date(newSunset)
            hoursSunset = dateSunset.getHours()
            convertedHour = convertHour(hoursSunset)
            minutesSunset = dateSunset.getMinutes()
            convertedMinute = convertMinutes(minutesSunset)
            morningOrAfternoon = defineAM_PM(hoursSunset)
            fullSunset = `${convertedHour}:${convertedMinute}${morningOrAfternoon}`
            oldSunset.innerHTML = fullSunset
    }
    
    function getStats (response) {
        let newTemp = response.data.main.temp;
        let newWeather = response.data.weather[0].main
        let newWind = response.data.wind.speed
        let newHumidity = response.data.main.humidity
        let newSunrise = response.data.sys.sunrise
        let newSunset = response.data.sys.sunset
            updateTemp(newTemp)
            updateWeather(newWeather)
            updateEmoji(newWeather)
            updateWind(newWind)
            updateHumidity(newHumidity)
            updateSunrise(newSunrise)
            updateSunset(newSunset)
    }

    function updateCity (newCity) {
        newCity = newCity.trim()
        newCity = newCity.charAt(0).toUpperCase() + newCity.slice(1)
        let oldCity = document.querySelector("#selected-city");
        document.querySelector("#entry-line").value = ""
        oldCity.innerHTML = newCity
    }
    
    function triggerApi(event) {
        event.preventDefault ();
    
        //this piece stores the enter city and sends it to the updateCity function
        let newCity = document.querySelector("#entry-line").value;
        updateCity(newCity)

        //this piece triggers pulling the API data to initiate other functions
        let apiKey = `a20670b64f2243817bd352afb3a3d0b5`
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${apiKey}`;
        axios.get(url).then(getStats)
        
        //this piece retriggers the updating of the current date
        dateDisplay = document.querySelector("#cur-day-time");
        dateDisplay.innerHTML = showDayTime(new Date)
    }   

//this is the Event Listener button for the Change City Button
let changeCity = document.querySelector("#submit-button")
changeCity.addEventListener("click", triggerApi)


    function initialCity (){
        let newCity = "New York"
            updateCity(newCity)
        let apiKey = `a20670b64f2243817bd352afb3a3d0b5`
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${apiKey}`;
            axios.get(url).then(getStats)
    }   

    initialCity()

    function showDayTime (date) {

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        let currentDay = days[date.getDay()];
        let currentMonth = months[date.getMonth()]
        let currentDate = date.getDate()
        let currentHour = date.getHours()
            convertedHour = convertHour(currentHour)
        let currentMinute = date.getMinutes()
            convertedMinute = convertMinutes(currentMinute)
        let am_or_pm = defineAM_PM(currentHour)

        let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${convertedHour}:${currentMinute}${am_or_pm}`
        return formattedDate
    }

    let dateDisplay = document.querySelector("#cur-day-time");
    dateDisplay.innerHTML = showDayTime(new Date)