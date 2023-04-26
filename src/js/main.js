// Materiales de apoyo  ⚡️  https://youtu.be/eLqMkQf4Qks  ⚡️  https://youtu.be/LJzDHKPLWYw?t=2715   ⚡️  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 


const API_JOKE_ONE = 'https://icanhazdadjoke.com/';
const API_JOKE_TWO = 'https://api.chucknorris.io/jokes/random';
const headers = { 'Accept': 'application/json' };

const jokeElement = document.getElementById('joke');
const rateOne = document.getElementById('rateOne');
const rateTwo = document.getElementById('rateTwo');
const rateThree = document.getElementById('rateThree');
const nextButton = document.getElementById('nextJoke');
const rateButtons = document.getElementsByClassName('jokerate-btn');

let currentAPI = 0;

nextButton.addEventListener('click', nextJoke);

// Create an empty array to store joke objects
const reportJokes = [];

// Function to fetch a joke and handle voting
function nextJoke() {
  // Display the rating buttons
  Array.from(rateButtons).forEach(button => {
    button.style.display = 'inline-block';
  });

  // Get the current joke API URL and increment the currentAPI variable
  const apiUrl = currentAPI === 0 ? API_JOKE_ONE : API_JOKE_TWO;
  currentAPI = (currentAPI + 1) % 2;

  // Call the API to get a joke
  fetch(apiUrl, { headers })
    // Parse the data response as JSON
    .then(response => response.json())
    // Handle the data received
    .then(data => {
      // Create a new joke object with a score of 0 and the current date in an ISO string if current API === 1 
      const jokes = currentAPI === 1 ? {
        joke: data.joke,
        score: 0,
        date: new Date().toISOString()
      } : {
        joke: data.value,
        score: 0,
        date: new Date().toISOString()
      };

      // Display the joke text on screen 
      jokeElement.innerText = jokes.joke;

      // Change button text to Next Joke
      nextButton.textContent = " Next Joke ";
   
    

      // Add event listeners for each rating button 
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

      console.log("🤡 Current Joke Object: ", jokes);
      // Log the current joke object to the console

    })
    // Handle any errors
    .catch(error => console.error(error));
}

// Function to update reportJokes array with the joke object

function updateReportJokes(jokes) {

  // Check if the joke is already in the reportJokes array using findIndex
  const index = reportJokes.findIndex(obj => obj.joke == jokes.joke);

  // If it is, update the existing object with the new score
  if (index !== -1) {
    reportJokes[index] = jokes;
  } 
  // Otherwise, add the new joke object to the reportJokes array
  else {
    reportJokes.push(jokes);
  }
  
  console.log("ℹ️ Report Jokes: ", reportJokes);
}