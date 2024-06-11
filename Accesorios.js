let accesorios = []; // Variable global para almacenar los accesorios

// FUNCION PARA CARGAR LOS ACCESORIOS DESDE EL JSON
async function cargarDatosAccesorios() {
  try {
    const responseAccesorios = await fetch('data/accesorios.json'); // Ruta al JSON de accesorios
    if (!responseAccesorios.ok) {
      throw new Error('No se pudieron cargar los datos');
    }
    const accesoriosJSON = await responseAccesorios.json();
    accesorios = accesoriosJSON; // Asignar los accesorios cargados a la variable global
    return { accesorios: accesoriosJSON };
  } catch (error) {
    console.error(error);
    return { accesorios: [] }; // Si hay un error, retorna accesorios vacíos y log vacío
  }
}

function renderizarAccesorios(accesorios) {
  var accesoriosContainer = document.getElementById('accesoriosContainer'); 
  accesoriosContainer.innerHTML = '';
  accesorios.forEach(accesorio => {
    var card = document.createElement('div');
    card.classList.add('tarjeta-producto', 'col-md-4', 'mb-4');
    var img = document.createElement('img');
    img.src = accesorio.imagen;
    img.alt = accesorio.nombre;
    img.title = accesorio.nombre;
    var content = document.createElement('div');
    content.classList.add('contenido');
    var name = document.createElement('h2');
    name.textContent = accesorio.nombre;
    var link = document.createElement('a');
    link.href = accesorio.url;
    var button = document.createElement('button');
    button.classList.add('boton', 'btn', 'btn-primary');
    button.textContent = "Ver detalles";

    link.appendChild(button);
    content.appendChild(name);
    content.appendChild(link);
    card.appendChild(img);
    card.appendChild(content);
    accesoriosContainer.appendChild(card);
  });
}

// Función para ordenar los accesorios de A a Z
function ordenarAZAccesorios() {
  accesorios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados de A a Z');
}

// Función para ordenar los accesorios de Z a A
function ordenarZAAccesorios() {
  accesorios.sort((a, b) => b.nombre.localeCompare(a.nombre));
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados de Z a A');
}

// Función para manejar la búsqueda de accesorios
function buscarAccesorio() {
  var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  var resultados = accesorios.filter(function(accesorio) {
    return accesorio.nombre.toLowerCase().includes(searchTerm);
  });

  var accesoriosContainer = document.getElementById('accesoriosContainer');
  accesoriosContainer.innerHTML = '';

  if (resultados.length > 0) {
    resultados.forEach(function(accesorio) {
      var card = document.createElement('div');
      card.classList.add('tarjeta-producto', 'col-md-4', 'mb-4');
      var img = document.createElement('img');
      img.src = accesorio.imagen;
      img.alt = accesorio.nombre;
      img.title = accesorio.nombre;
      var content = document.createElement('div');
      content.classList.add('contenido');
      var name = document.createElement('h2');
      name.textContent = accesorio.nombre;
      var link = document.createElement('a');
      link.href = accesorio.url;
      var button = document.createElement('button');
      button.classList.add('boton', 'btn', 'btn-primary');
      button.textContent = "Ver detalles";

      link.appendChild(button);
      content.appendChild(name);
      content.appendChild(link);
      card.appendChild(img);
      card.appendChild(content);
      accesoriosContainer.appendChild(card);
    });
  } else {
    accesoriosContainer.textContent = 'No se encontraron resultados para la búsqueda: ' + searchTerm;
  }
}

// Evento de carga de la página
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { accesorios, log } = await cargarDatosAccesorios();
    console.log('Accesorios cargados:', accesorios);
    renderizarAccesorios(accesorios);

    document.getElementById('sortAZButtonAccesorios').addEventListener('click', ordenarAZAccesorios);
    document.getElementById('sortZAButtonAccesorios').addEventListener('click', ordenarZAAccesorios);
    document.getElementById('searchButton').addEventListener('click', buscarAccesorio);
  } catch (error) {
    console.error(error);
  }
});
