// Materiales de apoyo  ⚡️  https://youtu.be/eLqMkQf4Qks  ⚡️  https://youtu.be/LJzDHKPLWYw?t=2715   ⚡️  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 


const API_JOKE = 'https://icanhazdadjoke.com/';
const headers = { 'Accept': 'application/json' };
const jokeElement = document.getElementById('joke');
const nextButton =  document.getElementById('nextJoke');



nextButton.addEventListener('click', () => {
  fetch(API_JOKE, { headers })
    .then(response => response.json())
    .then(data => jokeElement.textContent = data.joke);
});


const reportAcudits = [
  {
    broma: "...",
    puntuación: 1,
    fecha: 45
  
  }
]

const date = new Date();
const dateISOString = date.toISOString();

console.log(dateISOString); // Devuelve una cadena de texto con la fecha en formato ISO
