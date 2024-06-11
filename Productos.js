let productos = []; // Variable global para almacenar los productos

// FUNCION PARA CARGAR LOS PRODUCTOS DESDE EL JSON
async function cargarDatosProductos() {
  try {
    const responseProductos = await fetch('data/productos.json'); // Ruta al JSON de productos
    if (!responseProductos.ok) {
      throw new Error('No se pudieron cargar los datos');
    }
    const productosJSON = await responseProductos.json();
    productos = productosJSON; // Asignar los productos cargados a la variable global
    return { productos: productosJSON };
  } catch (error) {
    console.error(error);
    return { productos: [] }; // Si hay un error, retorna productos vacíos y log vacío
  }
}

function renderizarProductos(productos) {
  var productContainer = document.getElementById('productContainer'); 
  productContainer.innerHTML = '';
  productos.forEach(producto => {
    var card = document.createElement('div');
    card.classList.add('tarjeta-producto', 'col-md-4', 'mb-4');
    var img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.title = producto.nombre;
    var content = document.createElement('div');
    content.classList.add('contenido');
    var name = document.createElement('h2');
    name.textContent = producto.nombre;
    var link = document.createElement('a');
    link.href = producto.url;
    var button = document.createElement('button');
    button.classList.add('boton', 'btn', 'btn-primary');
    button.textContent = "Ver detalles";

    link.appendChild(button);
    content.appendChild(name);
    content.appendChild(link);
    card.appendChild(img);
    card.appendChild(content);
    productContainer.appendChild(card);
  });
}

// Función para ordenar los productos de A a Z
function ordenarAZ() {
  productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  renderizarProductos(productos);
  alert('Productos ordenados de A a Z');
}

// Función para ordenar los productos de Z a A
function ordenarZA() {
  productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
  renderizarProductos(productos);
  alert('Productos ordenados de Z a A');
}

// Función para manejar la búsqueda de productos
function buscarProducto() {
  var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  var resultados = productos.filter(function(producto) {
    return producto.nombre.toLowerCase().includes(searchTerm);
  });

  var productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  if (resultados.length > 0) {
    resultados.forEach(function(producto) {
      var card = document.createElement('div');
      card.classList.add('tarjeta-producto', 'col-md-4', 'mb-4');
      var img = document.createElement('img');
      img.src = producto.imagen;
      img.alt = producto.nombre;
      img.title = producto.nombre;
      var content = document.createElement('div');
      content.classList.add('contenido');
      var name = document.createElement('h2');
      name.textContent = producto.nombre;
      var link = document.createElement('a');
      link.href = producto.url;
      var button = document.createElement('button');
      button.classList.add('boton', 'btn', 'btn-primary');
      button.textContent = "Ver detalles";

      link.appendChild(button);
      content.appendChild(name);
      content.appendChild(link);
      card.appendChild(img);
      card.appendChild(content);
      productContainer.appendChild(card);
    });
  } else {
    productContainer.textContent = 'No se encontraron resultados para la búsqueda: ' + searchTerm;
  }
}

// Evento de carga de la página
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { productos, log } = await cargarDatosProductos();
    console.log('Productos cargados:', productos);
    renderizarProductos(productos);

    document.getElementById('sortAZButton').addEventListener('click', ordenarAZ);
    document.getElementById('sortZAButton').addEventListener('click', ordenarZA);
    document.getElementById('searchButton').addEventListener('click', buscarProducto);
  } catch (error) {
    console.error(error);
  }
});
