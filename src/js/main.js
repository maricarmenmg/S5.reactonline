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



// Ejercicio 3

const reportAcudits = [];

function valorarChiste(joke) {
  // Creamos un objeto para almacenar la información del chiste valorado
  const valoracion = {
    joke: joke,
    resultado: 1,
    date: new Date().toISOString() // Guardamos la fecha en formato ISO
  };

  // Mostramos los botones de valoración
  const botones = document.getElementById("rate-one");
  botones.style.display = "block";

  // Asignamos los eventos para las votaciones
  const votos = document.querySelectorAll(".voto");
  votos.forEach(voto => {
    voto.addEventListener("click", function() {
      valoracion.resultado = parseInt(this.dataset.valoracion);
      console.log("Se ha valorado el chiste:", valoracion);
      cargarSiguienteChiste();
    });
  });

  // Añadimos la valoración al array
  reportAcudits.push(valoracion);
}


function loadNextJoke() {
}

// Load the next joke for the user to rate








