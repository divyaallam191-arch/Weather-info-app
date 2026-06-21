const weatherForm = document.querySelector(".WeatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".weather-card");
const apiKey = "e2e2071c52555baa5e395cf5b1ebba01";
 
weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city = cityInput.value;
    
    if(city){
       try{
          const weatherData = await getWeatherData(city);
          displayWeatherInfo(weatherData);

       }catch(error){
          
           displayError(error);
       }
    }else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){
     const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
     const response = await fetch(apiurl);
     
     if(!response.ok){
        console.log("response in not okay!");
        throw new Error("Enter valid city name");
     }
     return await response.json();
}

function displayWeatherInfo(data){
     
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]} = data;
    card.textContent="";
    card.style.display="flex";   
     

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent =`${(((temp-273.15)*(9/5))+32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity - ${humidity} %`;
    descDisplay.textContent=capitalize(description);
    weatherEmoji.textContent=getWeatherEmoji(id);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

}
function getWeatherEmoji(weatherId){
     switch(true){
        case (weatherId>=200 && weatherId<300):
            return "⛈️";
        case (weatherId>=300 && weatherId<400):
            return "☁️";  
        case (weatherId>=400 && weatherId<500):
            return "🌧️";      
        case (weatherId>=500 && weatherId<600):
            return "🌧️";
        case (weatherId>=600 && weatherId<700):
            return "❄️";
        case (weatherId<=700 && weatherId<800):
            return "💨";  
        case  (weatherId==800):
            return "☀️";
        case (weatherId>=801 && weatherId<=810):
            return "☁️";
        default:
            return "❓";
     }

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}
function capitalize(str){
    return str.split(" ").map(word=>word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join(" ");
}



