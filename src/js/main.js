// Materiales de apoyo  ⚡️  https://youtu.be/eLqMkQf4Qks  ⚡️  https://youtu.be/LJzDHKPLWYw?t=2715   ⚡️  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch  ⚡️  https://rapidapi.com/hub

const API_JOKE_ONE = 'https://icanhazdadjoke.com/';
const API_JOKE_TWO = 'https://api.chucknorris.io/jokes/random';
const API_WEATHER =  'https://api.openweathermap.org/data/';
const headers = { 'Accept': 'application/json' };
const jokeElement = document.getElementById('joke');
const rateOne = document.getElementById('rateOne');
const rateTwo = document.getElementById('rateTwo');
const rateThree = document.getElementById('rateThree');
const nextButton = document.getElementById('nextJoke');
const rateButtons = document.getElementsByClassName('jokerate-btn');
const weatherElement = document.getElementById('weather');

let currentAPI = 0;

nextButton.addEventListener('click', nextJoke);

// Create an empty array to store joke objects
const reportJokes = [];


// 🤣 FETCH JOKE RATE


// Función nextJoke() obtener y mostrar un nuevo chiste 

function nextJoke() {
  // Display the rating buttons
  Array.from(rateButtons).forEach(button => {
    button.style.display = 'inline-block';
  });


// Obtener la URL actual de la API de chistes e incrementar la variable currentAPI

  const apiUrl = currentAPI === 0 ? API_JOKE_ONE : API_JOKE_TWO;
  currentAPI = (currentAPI + 1) % 2;


  // LLamada a la API para obtener chiste

  fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {
      // Crear un nuevo objeto joke con una puntuación de 0 y la fecha actual en una cadena ISO if API actual === 1
      const jokes = currentAPI === 1 ? {
        joke: data.joke,
        score: 0,
        date: new Date().toISOString()
      } : {
        joke: data.value,
        score: 0,
        date: new Date().toISOString()
      };


      // Mostrar el texto del chiste en pantalla
      jokeElement.innerText = jokes.joke;


 // Cambiar el texto del botón a Next Joke
      nextButton.textContent = " Next Joke ";
   
      // Añadir event listeners para cada botón de valoración
      rateOne.addEventListener('click', () => {
        jokes.score = 1;
        updateReportJokes(jokes);
      });
      rateTwo.addEventListener('click', () => {
        jokes.score = 2;
        updateReportJokes(jokes);
      });
      rateThree.addEventListener('click', () => {
        jokes.score = 3;
        updateReportJokes(jokes);
      });

      // Mostrar por consola el chiste
      console.log(" 🤡 Current Joke Object: ", jokes);

    })

    // Handle any errors
    .catch(error => console.error(error));
}


// Función para actualizar el array reportJokes con el objeto joke

function updateReportJokes(jokes) {

 // Comprobamos si el chiste está en el array reportJokes usando findIndex
  const index = reportJokes.findIndex(obj => obj.joke == jokes.joke);

  // Si lo es, actualiza el objeto existente con la nueva puntuación
  if (index !== -1) {
    reportJokes[index] = jokes;
  } 
  // En caso contrario, añade el nuevo objeto al array reportJokes
  else {
    reportJokes.push(jokes);
  }
  
  // Mostrar por consola puntuaciones
  console.log(" ℹ️ Report Jokes: ", reportJokes);

}



// ⛅️  FETCH WEATHER DATA 

// Fetch the weather from the OpenWeatherMap API

fetch ('https://api.openweathermap.org/data/2.5/weather?q=Andorra+La+Vella&appid=5f99286a37c156fb55555994b13d8cb5', {
// Set the headers to indicate that the response should be in JSON format  
headers: {
    'Accept': 'application/json'
  }
})

.then(response => response.json())
.then( data => { 
  const cityName = data.name; 
  const iconCode = data.weather[0].icon;
  const weatherIcon = document.getElementById("weather-icon");
  const kelvinTemp = data.main.temp;
  const temperatureElement = document.getElementById("degrees");
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;
  const celsiusTemp = Math.floor(kelvinTemp - 273.15);
  temperatureElement.innerText = `${celsiusTemp}°C`;
  const cityNameElement = document.getElementById("city-name");
  cityNameElement.innerText = cityName;

})