var textEl = document.querySelector(".text");
var tableEl = document.querySelector(".history");
var detailsEl = document.querySelector(".details");
var forecastEl = document.getElementById("forecast");
var specifics = document.querySelector(".specifics");
var searchEl = document.getElementById("search");
var uv = document.getElementById("uvIndex");
var iconEl = document.getElementById('icon');
var current = {};
var data;
var cities = [];
var lat;
var lon;
var weather;
let test = document.getElementsByClassName("tr")


function todayDate(){
    var date = document.getElementById("date");
    date.textContent = moment().format("MM/DD/YY");
    var day = document.getElementById("dayOne");
    day.textContent = moment().add(1,"d").format("MM/DD/YY");
    var day = document.getElementById("dayTwo");
    day.textContent = moment().add(2,"d").format("MM/DD/YY");
    var day = document.getElementById("dayThree");
    day.textContent = moment().add(3,"d").format("MM/DD/YY");
    var day = document.getElementById("dayFour");
    day.textContent = moment().add(4,"d").format("MM/DD/YY");
    var day = document.getElementById("dayFive");
    day.textContent = moment().add(5,"d").format("MM/DD/YY");

}

//generate previous searches
searchedCities();
//Today's date
todayDate();

// event listner for search button
searchEl.addEventListener("click", function(){
        var tr = document.createElement("tr");
        tr.innerHTML = textEl.value;
        document.getElementById("history").appendChild(tr);
        tr.setAttribute("class", "tr");
        document.querySelector('.city').innerHTML = textEl.value;
        
        // store searched city in local storage
        // for(var i = 0; i < cities.length; i++){
        //     if(cities)
        // }
        cities.push(textEl.value);
        localStorage.setItem('cityHistory', JSON.stringify(cities));

        // get weather
        getWeather()

       
  });   
 

function searchedCities(){
    var history = JSON.parse(localStorage.getItem("cityHistory"));
    if(history !== null){
        for(i = 0; i<history.length; i++){
            var tr = document.createElement("tr");
            tr.innerHTML = history[i];
            document.getElementById("history").appendChild(tr);
            tr.setAttribute("class", "tr");
        }
    }
}


console.log(test)

// adding eventlistener to the table of previously searched cities to generate weather data when clicked
for(var i  = 0; i < test.length; i++){
    test[i].addEventListener("click", function(){
        
        console.log(this.innerHTML)
        textEl.value = this.innerHTML;
        document.querySelector('.city').innerHTML = textEl.value;
        console.log("its working")
    
      getWeather()
    })
    

}


// getting the weather from the api
function getWeather () {
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + textEl.value + '&appid=0994a3c9fb88bc55920cad1dcba658d4')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        lat =  (data.coord.lat);
        lon = (data.coord.lon);
    }) 

  
    .then(function(){
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=0994a3c9fb88bc55920cad1dcba658d4`)
                    
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data){
                        
                        forecast = data.daily;
                        current = data.current;
                   
                        iconEl.setAttribute("src",`http://openweathermap.org/img/w/${current.weather[0].icon}.png`);
                        
        
                        //Current weather details
                        document.getElementById('temp').innerHTML = `${data.current.temp} Degrees`;
                        document.getElementById('humidity').innerHTML = `${data.current.humidity}%`;
                        document.getElementById('windSpeed').innerHTML = `${data.current.wind_speed} mph`;
                        document.getElementById('uvIndex').innerHTML = `${Math.round(data.current.uvi)}`;
                        
        
                            //uv index colors
                                if(uv.textContent>=0 && uv.textContent<4){
                                    uv.setAttribute("style", "background-color:skyblue;");
                                }else if (uv.textContent >= 4 && uv.textContent < 8){
                                    uv.setAttribute("style", "background-color:yellow;");
                                }else if (uv.textContent >= 8){
                                    uv.setAttribute("style", "background-color:red;");
                                }
                         //forcast weather details      
                        document.getElementById('oneTemp').innerHTML = `${forecast[1].temp.max} Degrees`;
                        document.getElementById('oneHum').innerHTML = `${forecast[1].humidity}%`;
                        document.getElementById('iconOne').setAttribute("src",`http://openweathermap.org/img/w/${forecast[1].weather[0].icon}.png`);
                        
                        document.getElementById('twoTemp').innerHTML = `${forecast[2].temp.max} Degrees`;
                        document.getElementById('twoHum').innerHTML = `${forecast[2].humidity}%`;
                        document.getElementById('iconTwo').setAttribute("src", `http://openweathermap.org/img/w/${forecast[2].weather[0].icon}.png`);

                        document.getElementById('threeTemp').innerHTML = `${forecast[3].temp.max} Degrees`;
                        document.getElementById('threeHum').innerHTML = `${forecast[3].humidity}%`;
                        document.getElementById('iconThree').setAttribute("src", `http://openweathermap.org/img/w/${forecast[3].weather[0].icon}.png`);


                        document.getElementById('fourTemp').innerHTML = `${forecast[4].temp.max} Degrees`;
                        document.getElementById('fourHum').innerHTML = `${forecast[4].humidity}%`;
                        document.getElementById('iconFour').setAttribute("src", `http://openweathermap.org/img/w/${forecast[4].weather[0].icon}.png`);


                        document.getElementById('fiveTemp').innerHTML = `${forecast[5].temp.max} Degrees`;
                        document.getElementById('fiveHum').innerHTML = `${forecast[5].humidity}%`;   
                        document.getElementById('iconFive').setAttribute("src", `http://openweathermap.org/img/w/${forecast[5].weather[0].icon}.png`);

                        
                    })
                //clear search bar    
                textEl.value ='';
                

    })

}