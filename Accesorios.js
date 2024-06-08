let accesorios = []; // Variable global para almacenar los accesorios

// FUNCION PARA CARGAR LOS ACCESORIOS DESDE EL JSON
async function cargarAccesorios() {
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
    return { accesorios: [] }; // Si hay un error, retorna accesorios vacíos
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
// Función para manejar la búsqueda de productos
function buscarProducto() {
    // Obtener el valor ingresado en el campo de búsqueda
    var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  
    // Filtrar la lista de productos para encontrar coincidencias con el término de búsqueda
    var resultados = productos.filter(function(producto) {
      return producto.nombre.toLowerCase().includes(searchTerm);
    });
  
    // Mostrar los resultados de la búsqueda en la página HTML
    var productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
  
    if (resultados.length > 0) {
      // Si se encontraron resultados, renderizar los productos coincidentes
      resultados.forEach(function(producto) {
        var card = document.createElement('div');
        card.classList.add('tarjeta-producto');
  
        var img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.title = producto.nombre;
  
        var content = document.createElement('div');
        content.classList.add('contenido');
  
        var name = document.createElement('h2');
        name.textContent = producto.nombre;
  
        var description = document.createElement('p');
        description.textContent = producto.descripcion;
  
        var capacity = document.createElement('p');
        capacity.classList.add('capacidad');
        capacity.textContent = `Capacidad: ${producto.capacidad}`;
  
        var link = document.createElement('a');
        link.href = producto.url;
  
        var button = document.createElement('button');
        button.classList.add('boton');
        button.textContent = "Ver detalles";
        var cartButton = document.createElement('button');
    
        link.appendChild(button);
        content.appendChild(name);
        content.appendChild(description);
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
  
  // Asignar la función buscarProducto al evento click del botón de búsqueda
  document.getElementById('searchButton').addEventListener('click', buscarProducto);

// Evento de carga de la página
document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Cargar datos
      const { productos, log } = await cargarDatos();
  
      // Imprimir los productos cargados
      console.log('Productos cargados:', productos);
  
      // Renderizar productos
      renderizarProductos(productos);
  
      // Mostrar log en algún lugar de la página
      document.getElementById('logContainer').textContent = log;
  
      // Asignar funciones a eventos
     // Función para manejar el evento de ordenar de A a Z
  document.getElementById('sortAZButton').addEventListener('click', ordenarAZ);
  
  // Función para manejar el evento de ordenar de Z a A
  document.getElementById('sortZAButton').addEventListener('click', ordenarZA);
  
  document.getElementById('sortCapacidadButton').addEventListener('click', ordenarPorCapacidad);
  
      // Evento de búsqueda
      document.getElementById('searchButton').addEventListener('click', buscarProducto);
  
      // Resto de los eventos
    } catch (error) {
      console.error(error);
    } 
});
