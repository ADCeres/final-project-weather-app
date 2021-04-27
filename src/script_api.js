//this section updates the Current Temperature & City through API
    function getCLInfo (response) {
        let newCity = response.data.name;
        let oldCity = document.querySelector("#selected-city");
        document.querySelector("#entry-line").value = "";
        oldCity.innerHTML = newCity;

        getStats(response)
    }

//this function sends Geo-Location LAT and LON data to API Weather        
    function determinePosition (position) {
        console.log(position)
        let apiKey = `a20670b64f2243817bd352afb3a3d0b5`;
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log(lat)
        console.log(lon)

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        axios.get(url).then(getCLInfo);
    }

//this function intiates the Geo-Location grab
    function getPosition(event){
        event.preventDefault ();
        navigator.geolocation.getCurrentPosition(determinePosition);
    }

    function calculateForecastMaxFahrenheit () {
        let maxTempArray = document.querySelectorAll("#forecast-temp-max");   
            arrayNumber = -1;

        maxTempArray.forEach(function (){
                arrayNumber = arrayNumber + 1;
            let oldMax = maxTempArray[arrayNumber].innerHTML;
            let tempLenOne = oldMax.length-2;    
                oldMax = oldMax.substring(0, tempLenOne);

            let newMax = (oldMax * (9/5) + 32);
                newMax = newMax.toFixed(0);

                maxTempArray[arrayNumber].innerHTML = `${newMax}°C`;
        })
    }

    function calculateForecastMinFahrenheit () {
        let minTempArray = document.querySelectorAll("#forecast-temp-min"); 
            arrayNumber = -1;

        minTempArray.forEach(function (){
                arrayNumber = arrayNumber + 1;
            let oldMin = minTempArray[arrayNumber].innerHTML;
            let tempLenOne = oldMin.length-2;    
                oldMin = oldMin.substring(0, tempLenOne);

            let newMin = (oldMin * (9/5) + 32);

                newMin = newMin.toFixed(0);

                minTempArray[arrayNumber].innerHTML = `${newMin}°C`;
        })
    }

    function calculateFeelFahrenheit() {
        let currentFeel = document.querySelector("#cur-temp-feel").innerHTML;
        let feelLen = currentFeel.length-2;    
            currentFeel = currentFeel.substring(0, feelLen);

        let newFeel = (currentFeel * (9/5) + 32);
            newFeel = newFeel.toFixed(0);
        
        newFeel = `${newFeel}°F`;
        document.querySelector("#cur-temp-feel").innerHTML = newFeel;
    }

//the function converts the Current Temperature into Fahrenheit (if it is in Celsius)
    function calculateFahrenheit () {
        let currentTempUnit = document.querySelector("#cur-temp").innerHTML;
        let tempLen = currentTempUnit.length-2;    
        let currentTemp = currentTempUnit.substring(0, tempLen);
        let newTemp = (currentTemp * (9/5) + 32);
            newTemp = newTemp.toFixed(0);
        
        let newTempUnit = `${newTemp}°F`;
        document.querySelector("#cur-temp").innerHTML = `${newTempUnit}`;

        calculateFeelFahrenheit();
        calculateForecastMaxFahrenheit();
        calculateForecastMinFahrenheit();
    }

    function calculateForecastMaxCelsius () {
        let maxTempArray = document.querySelectorAll("#forecast-temp-max");   
            arrayNumber = -1;

        maxTempArray.forEach(function (){
                arrayNumber = arrayNumber + 1;
            let oldMax = maxTempArray[arrayNumber].innerHTML;
            let tempLenOne = oldMax.length-2;    
                oldMax = oldMax.substring(0, tempLenOne);

            let newMax = (oldMax - 32) * (5/9);
                newMax = newMax.toFixed(0);

                maxTempArray[arrayNumber].innerHTML = `${newMax}°C`;
        })
    }

    function calculateForecastMinCelsius () {
        let minTempArray = document.querySelectorAll("#forecast-temp-min") ;  
            arrayNumber = -1;

        minTempArray.forEach(function (){
                arrayNumber = arrayNumber + 1;
            let oldMin = minTempArray[arrayNumber].innerHTML;
            let tempLenOne = oldMin.length-2;    
                oldMin = oldMin.substring(0, tempLenOne);

            let newMin = (oldMin - 32) * (5/9);
                newMin = newMin.toFixed(0);

                minTempArray[arrayNumber].innerHTML = `${newMin}°C`;
        })
    }

    function calculateFeelCelsius () {
        let currentFeel = document.querySelector("#cur-temp-feel").innerHTML;
        let feelLen = currentFeel.length-2;    
            currentFeel = currentFeel.substring(0, feelLen);

        let newFeel = (currentFeel - 32) * (5/9);
            newFeel = newFeel.toFixed(0);
        
        newFeel = `${newFeel}°C`;
        document.querySelector("#cur-temp-feel").innerHTML = newFeel;
    }

//the function converts the Current Temperature into Celsius (if it is in Fahrenheit)
    function calculateCelsius () {
        let currentTempUnit = document.querySelector("#cur-temp").innerHTML;
        let tempLen = currentTempUnit.length-2;    
        let currentTemp = currentTempUnit.substring(0, tempLen);
        let newTemp = (currentTemp - 32) * (5/9);
            newTemp = newTemp.toFixed(0);

        let newTempUnit = `${newTemp}°C`;
        document.querySelector("#cur-temp").innerHTML = `${newTempUnit}`;

        calculateFeelCelsius();
        calculateForecastMaxCelsius();
        calculateForecastMinCelsius();
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

//This section of code updates all the weather stats for a user-entered city

    function updateTemp (newTemp) {
        let oldTemp = document.querySelector("#cur-temp");
            newTemp =  newTemp.toFixed(0);
            newTemp = `${newTemp}°F`;
        oldTemp.innerHTML = newTemp;
    }

    function updateFeel (newFeel) {
        let oldFeel = document.querySelector("#cur-temp-feel");
            newFeel =  newFeel.toFixed(0);
            newFeel = `${newFeel}°F`;
        oldFeel.innerHTML = newFeel;
    }

    function updateWeather (newWeather) {
        let oldWeather = document.querySelector("#cur-emoji-desc");
        oldWeather.innerHTML = newWeather;
    }

    function updateEmoji (newWeather) {
        let newEmoji = document.querySelector("#cur-emoji");     

        switch (newWeather) {
        case "Clouds":
            return "☁️";
            break;
        case "Rain":
            return "🌧";
            break;
        case "Sunny":
            return "☀️";
            break;
        case "Snow":
            return "❄️";
            break;
        case "Storm":
            return "⛈";
            break;
        case "Tornado":
            return "🌪";
            break;
        case "Hail":
            return "🌨";
            break;
        case "Fog":
            return "🌫";
            break;
        case "Extreme":
            return "❗";
            break;
        case "Windy":
            return "💨";
            break;
        case "Clear":
            return "☀️";
            break;
        default:
            return "❗❗";
            break;
        }
    }

    function updateWind (newWind) { 
        let oldWind = document.querySelector("#wind");
        newWind = newWind.toFixed(0);
        oldWind.innerHTML = `${newWind}mph`;
    }   

    function updateHumidity (newHumidity) {
        let oldHumidity = document.querySelector("#humidity");
        oldHumidity.innerHTML = `${newHumidity}%`;
    }

    function convertHour (hour) {
        let hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        return hours[hour];
    }

    function convertMinutes (minute) {
        if (minute < 10) {
            return `0${minute}`
        } else {
            return `${minute}`
        }
    }
    
    function defineAM_PM (hour) {
        if (hour <= 11) {
            return "AM"
        } else {
            return "PM"
        }
    }

    function updateSunrise (newSunrise) {
        let oldSunrise = document.querySelector("#sunrise");
            newSunrise = newSunrise * 1000;
        let dateSunrise = new Date(newSunrise);
        let hoursSunrise = dateSunrise.getHours();
        let convertedHour = convertHour(hoursSunrise);
        let minutesSunrise = dateSunrise.getMinutes();
        let convertedMinute = convertMinutes(minutesSunrise);
        let morningOrAfternoon = defineAM_PM(hoursSunrise);
        let fullSunrise = `${convertedHour}:${convertedMinute}${morningOrAfternoon}`;
            oldSunrise.innerHTML = fullSunrise;
    }

    function updateSunset (newSunset) {
        let oldSunset = document.querySelector("#sunset");
            newSunset = newSunset * 1000;
        let dateSunset = new Date(newSunset);
        let hoursSunset = dateSunset.getHours();
        let convertedHour = convertHour(hoursSunset);
        let minutesSunset = dateSunset.getMinutes();
        let convertedMinute = convertMinutes(minutesSunset);
        let morningOrAfternoon = defineAM_PM(hoursSunset);
        let fullSunset = `${convertedHour}:${convertedMinute}${morningOrAfternoon}`;
            oldSunset.innerHTML = fullSunset;
    }
    
    function determineForecastArray () {

        let date = new Date;
        let currentDay = date.getDay();

        switch (currentDay) {
        case 0:
            return ["Mon", "Tue","Wed","Thu", "Fri", "Sat"]
            break;
        case 1:
            return ["Tue","Wed","Thu", "Fri", "Sat", "Sun"]
            break;
        case 2:
            return ["Wed","Thu", "Fri", "Sat", "Sun", "Mon"]
            break;
        case 3:
            return ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]
            break;
        case 4:
            return ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"]
            break;
        case 5:
            return ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
            break;
        case 6:
            return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
            break;
        default:
            return ["Error","Error","Error","Error","Error","Error"]
            break;
        }
    }


    function displayForecast (response) {
        let forecastElement = document.querySelector("#forecast");
        let days = determineForecastArray();
        let forecastHTML = `<div class="row"> `
        let arrayNumber = -1
            
        days.forEach(function(day){
            arrayNumber = arrayNumber + 1
            
            let minTemp = response.data.daily[arrayNumber].temp.min
                minTemp = minTemp.toFixed(0)
            let maxTemp = response.data.daily[arrayNumber].temp.max
                maxTemp = maxTemp.toFixed(0)
            let emojiDesc = response.data.daily[arrayNumber].weather[0].main
            let emoji = updateEmoji(emojiDesc)

            forecastHTML = forecastHTML +
            `
            <div class="col-2">
                <span class="forecast-day">${day}</span>
                <div class="row">
                    <div class="card-body">
                        <p class="card-text subtext">
                            <span id="forecast-emoji">${emoji}</span>
                            <br />
                            <span id="forecast-desc">${emojiDesc}</span>
                            <br />
                            <span id="forecast-temp-max">${maxTemp}°F</span> |
                            <span id="forecast-temp-min">${minTemp}°F</span>
                        </p>
                    </div>
                </div>  
            </div>   
            `
        })

        forecastHTML = forecastHTML + `</div>`
        forecastElement.innerHTML = forecastHTML
    }

    function updateForecast (newForecast) {
        let lat = newForecast.lat;
        let lon = newForecast.lon;

        let apiKey = `a20670b64f2243817bd352afb3a3d0b5`;
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,alerts&units=imperial&appid=${apiKey}`;
        axios.get(url).then(displayForecast);
    }

    function getStats (response) {
        let newTemp = response.data.main.temp;
        let newFeel = response.data.main.feels_like;
        let newWeather = response.data.weather[0].main;
        let newWind = response.data.wind.speed;
        let newHumidity = response.data.main.humidity;
        let newSunrise = response.data.sys.sunrise;
        let newSunset = response.data.sys.sunset;
        let newForecast = response.data.coord
            updateTemp(newTemp);
            updateFeel(newFeel);
            updateWeather(newWeather);
            updateWind(newWind);
            updateHumidity(newHumidity);
            updateSunrise(newSunrise);
            updateSunset(newSunset);
            updateForecast(newForecast);

        let newEmoji = updateEmoji(newWeather);    
        let oldEmoji = document.querySelector("#cur-emoji");
        oldEmoji.innerHTML = newEmoji
    }

    function updateCity (newCity) {
        newCity = newCity.trim();
        newCity = newCity.charAt(0).toUpperCase() + newCity.slice(1);
        let oldCity = document.querySelector("#selected-city");
        document.querySelector("#entry-line").value = "";
        oldCity.innerHTML = newCity;
    }
    
    function triggerApi(event) {
        event.preventDefault ();
    
        //this piece stores the enter city and sends it to the updateCity function
        let newCity = document.querySelector("#entry-line").value;
        updateCity(newCity);

        //this piece triggers pulling the API data to initiate other functions
        let apiKey = `a20670b64f2243817bd352afb3a3d0b5`;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${apiKey}`;
        axios.get(url).then(getStats);
        
        //this piece retriggers the updating of the current date
        let dateDisplay = document.querySelector("#cur-day-time");
        dateDisplay.innerHTML = showDayTime(new Date);
    }   

    function initialCity (){
        let newCity = "New York";
            updateCity(newCity);
        let apiKey = `a20670b64f2243817bd352afb3a3d0b5`;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${apiKey}`;
            axios.get(url).then(getStats);
    }   

    function determineDay (day) {
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[day]
    }

    function determineMonth (month) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month]
    }

    function showDayTime (date) {
        let convertedDay = determineDay(date.getDay())
        let convertedMonth = determineMonth(date.getMonth())
        let convertedMinute = convertMinutes(date.getMinutes());
        let convertedHour = convertHour(date.getHours());
        let am_or_pm = defineAM_PM(date.getHours());
        let currentDate = date.getDate();

        let formattedDate = `<strong>Last Data Request:</strong> ${convertedDay}, ${convertedMonth} ${currentDate}, ${convertedHour}:${convertedMinute}${am_or_pm}`;
        return formattedDate;
    }

//this is the Event Listener button for the Change City Button
    let changeCity = document.querySelector("#submit-button");
    changeCity.addEventListener("click", triggerApi);

//this is the Event Listener button for the Fahrenheit to Celcius Conversion process
    let buttonConverterC = document.querySelector("#celsius");
    buttonConverterC.addEventListener("click", confirmUnitF);

//this is the Event Listener button for the Celsius to Fahrenheit Conversion process
    let buttonConverterF = document.querySelector("#fahrenheit");
    buttonConverterF.addEventListener("click", confirmUnitC);

//this sequence queues the updating of the "Last Data Request" timestamp
    let dateDisplay = document.querySelector("#cur-day-time");
    dateDisplay.innerHTML = showDayTime(new Date);

//this is the Event Listener button for the Current Location Button
    let currentLocation = document.querySelector("#current-location-button");
    currentLocation.addEventListener("click", getPosition);

    initialCity();
