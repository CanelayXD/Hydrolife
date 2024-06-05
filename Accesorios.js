let accesorios = []; // Variable global para almacenar los productos

// FUNCION PARA CARGAR LOS PRODUCTOS DESDE EL JSON
async function cargarDatos() {
  try {
    const responseAccesorios = await fetch('data/accesorios.json'); // Ruta al JSON de accesorios
    if (!responseAccesorios.ok) {
      throw new Error('No se pudieron cargar los datos');
    }
    const accesoriosJSON = await responseAccesorios.json();
    accesorios = accesoriosJSON; // Asignar los productos cargados a la variable global
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
    card.classList.add('tarjeta-accesorio');
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
    accesoriosContainer.appendChild(card);
  });
}

// Función para ordenar los productos de A a Z
function ordenarAZ() {
  accesorios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados de A a Z');
}

// Función para ordenar los productos de Z a A
function ordenarZA() {
  accesorios.sort((a, b) => b.nombre.localeCompare(a.nombre));
  renderizarProductos(accesorios);
  alert('Accesorios ordenados de Z a A');
}

// Función para ordenar los productos por precio de mayor a menor
function ordenarPrecioMayorMenor() {
  accesorios.sort((a, b) => {
    let precioA = parseFloat(a.precio.replace('$', '').replace(' Mx', ''));
    let precioB = parseFloat(b.precio.replace('$', '').replace(' Mx', ''));
    return precioB - precioA;
  });
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados por precio de mayor a menor');
}

// Función para ordenar los productos por precio de menor a mayor
function ordenarPrecioMenorMayor() {
  accesorios.sort((a, b) => {
    let precioA = parseFloat(a.precio.replace('$', '').replace(' Mx', ''));
    let precioB = parseFloat(b.precio.replace('$', '').replace(' Mx', ''));
    return precioA - precioB;
  });
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados por precio de menor a mayor');
}
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('sortAZButton').addEventListener('click', ordenarAZ);
  document.getElementById('sortZAButton').addEventListener('click', ordenarZA);
  document.getElementById('sortPrecioButton').addEventListener('click', ordenarPrecioMayorMenor);
  document.getElementById('sortPrecioMenorButton').addEventListener('click', ordenarPrecioMenorMayor);
});

function ordenarPorCapacidad() {
  accesorios.sort((a, b) => a.capacidad - b.capacidad);
  renderizarAccesorios(accesorios);
  alert('Accesorios ordenados por capacidad');
}
// Función para manejar la búsqueda de productos
function buscarAccesorio() {
  // Obtener el valor ingresado en el campo de búsqueda
  var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

  // Filtrar la lista de productos para encontrar coincidencias con el término de búsqueda
  var resultados = accesorios.filter(function(accesorio) {
    return accesorio.nombre.toLowerCase().includes(searchTerm);
  });

  // Mostrar los resultados de la búsqueda en la página HTML
  var accesoriosContainer = document.getElementById('accesoriosContainer');
  accesoriosContainer.innerHTML = '';

  if (resultados.length > 0) {
    // Si se encontraron resultados, renderizar los productos coincidentes
    resultados.forEach(function(accesorio) {
      var card = document.createElement('div');
      card.classList.add('tarjeta-accesorio');

      var img = document.createElement('img');
      img.src = accesorio.imagen;
      img.alt = accesorio.nombre;
      img.title = accesorio.nombre;

      var content = document.createElement('div');
      content.classList.add('contenido');

      var name = document.createElement('h2');
      name.textContent = accesorio.nombre;

      var description = document.createElement('p');
      description.textContent = accesorio.descripcion;

      var price = document.createElement('p');
      price.classList.add('precio');
      price.textContent = accesorio.precio;

      var capacity = document.createElement('p');
      capacity.classList.add('capacidad');
      capacity.textContent = `Capacidad: ${accesorio.capacidad}`;

      var link = document.createElement('a');
      link.href = accesorio.url;

      var button = document.createElement('button');
      button.classList.add('boton');
      button.textContent = "Ver detalles";
      var cartButton = document.createElement('button');
      cartButton.classList.add('boton', 'boton-carrito');
      cartButton.textContent = "Agregar al carrito";
  
      // Agregar evento click al botón "Agregar al carrito"
      cartButton.addEventListener('click', function() {
        agregarAlCarrito(accesorio);
      });
  
      var favoritesButton = document.createElement('button');
      favoritesButton.classList.add('boton', 'boton-favoritos');
      favoritesButton.textContent = "Agregar a favoritos";
  
      // Agregar evento click al botón "Agregar a favoritos"
      favoritesButton.addEventListener('click', function() {
        agregarAFavoritos(accesorio);
      });
  
      link.appendChild(button);
      content.appendChild(name);
      content.appendChild(description);
      content.appendChild(price);
      content.appendChild(link);
      content.appendChild(cartButton); // Agregar el botón "Agregar al carrito"
      content.appendChild(favoritesButton); // Agregar el botón "Agregar a favoritos"
      card.appendChild(img);
      card.appendChild(content);
      productContainer.appendChild(card);    });
  } else {
    // Si no se encontraron resultados, mostrar un mensaje en la página
    accesoriosContainer.textContent = 'No se encontraron resultados para la búsqueda: ' + searchTerm;
  }
}

// Asignar la función buscarProducto al evento click del botón de búsqueda
document.getElementById('searchButton').addEventListener('click', buscarAccesorio);

// Función para cargar productos desde localStorage
function loadAccesoriosFromLocalStorage() {
  // Simulación de carga de productos desde localStorage
  const storedAccesorios = localStorage.getItem('accesorios');
  if (storedAccesorios) {
    accesorios = JSON.parse(storedAccesorios);
  } else {
    accesorios = []; // Si no hay productos en localStorage, inicializa un array vacío.
  }
}

// Llamar a la función para cargar y mostrar los productos
loadAccesoriosFromLocalStorage();

// Evento de carga de la página
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar datos
    const { accesorios, log } = await cargarDatos();

    // Imprimir los productos cargados
    console.log('Accesorios cargados:', accesorios);

    // Renderizar productos
    renderizarAccesorios(accesorios);

    // Mostrar log en algún lugar de la página
    document.getElementById('logContainer').textContent = log;

    // Asignar funciones a eventos
   // Función para manejar el evento de ordenar de A a Z
document.getElementById('sortAZButton').addEventListener('click', ordenarAZ);

// Función para manejar el evento de ordenar de Z a A
document.getElementById('sortZAButton').addEventListener('click', ordenarZA);

document.getElementById('sortCapacidadButton').addEventListener('click', ordenarPorCapacidad);

    // Evento de búsqueda
    document.getElementById('searchButton').addEventListener('click', buscarAccesorio);

    // Resto de los eventos
  } catch (error) {
    console.error(error);
  }
});


