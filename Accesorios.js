let accesorios = []; // Variable global para almacenar los accesorios

// FUNCION PARA CARGAR LOS ACCESORIOS DESDE EL JSON
async function cargarDatos() {
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
  var productContainer = document.getElementById('productContainer'); 
  productContainer.innerHTML = '';
  accesorios.forEach(accesorio => {
    var card = document.createElement('div');
    card.classList.add('tarjeta-producto');
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
    button.classList.add('boton');
    button.textContent = "Ver detalles";

    link.appendChild(button);
    content.appendChild(name);
    content.appendChild(link);
    card.appendChild(img);
    card.appendChild(content);
    productContainer.appendChild(card);
  });
}

// Función para ordenar los accesorios de A a Z
function ordenarAZ() {
  accesorios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados de A a Z');
}

// Función para ordenar los accesorios de Z a A
function ordenarZA() {
  accesorios.sort((a, b) => b.nombre.localeCompare(a.nombre));
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados de Z a A');
}

// Función para manejar la búsqueda de accesorios
function buscarAccesorio() {
  // Obtener el valor ingresado en el campo de búsqueda
  var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

  // Filtrar la lista de accesorios para encontrar coincidencias con el término de búsqueda
  var resultados = accesorios.filter(function(accesorio) {
    return accesorio.nombre.toLowerCase().includes(searchTerm);
  });

  // Mostrar los resultados de la búsqueda en la página HTML
  var productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  if (resultados.length > 0) {
    // Si se encontraron resultados, renderizar los accesorios coincidentes
    resultados.forEach(function(accesorio) {
      var card = document.createElement('div');
      card.classList.add('tarjeta-producto');

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
      button.classList.add('boton');
      button.textContent = "Ver detalles";

      link.appendChild(button);
      content.appendChild(name);
      content.appendChild(link);
      card.appendChild(img);
      card.appendChild(content);
      productContainer.appendChild(card);
    });
  } else {
    // Si no se encontraron resultados, mostrar un mensaje en la página
    productContainer.textContent = 'No se encontraron resultados para la búsqueda: ' + searchTerm;
  }
}

// Asignar la función buscarAccesorio al evento click del botón de búsqueda
document.getElementById('searchButton').addEventListener('click', buscarAccesorio);

// Evento de carga de la página
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar datos
    const { accesorios, log } = await cargarDatos();

    // Imprimir los accesorios cargados
    console.log('Accesorios cargados:', accesorios);

    // Renderizar accesorios
    renderizarAccesorios(accesorios);

    // Mostrar log en algún lugar de la página
    document.getElementById('logContainer').textContent = log;

    // Asignar funciones a eventos
    document.getElementById('sortAZButton').addEventListener('click', ordenarAZ);
    document.getElementById('sortZAButton').addEventListener('click', ordenarZA);
  } catch (error) {
    console.error(error);
  }
});
