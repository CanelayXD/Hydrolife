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
    return { productos: [] }; // Si hay un error, retorna productos vacíos
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
    var capacidad = document.createElement('p');
    capacidad.textContent = 'Capacidad: ' + (producto.capacidad || 'N/A');
    var link = document.createElement('a');
    link.href = producto.url;
    var button = document.createElement('button');
    button.classList.add('boton', 'btn', 'btn-primary');
    button.textContent = "Ver detalles";

    link.appendChild(button);
    content.appendChild(name);
    content.appendChild(capacidad);
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

// Función para ordenar los productos por capacidad ascendente
function ordenarCapacidadAsc() {
  productos.sort((a, b) => (a.capacidad || 0) - (b.capacidad || 0));
  renderizarProductos(productos);
  alert('Productos ordenados por capacidad (Menor a Mayor)');
}

// Función para ordenar los productos por capacidad descendente
function ordenarCapacidadDesc() {
  productos.sort((a, b) => (b.capacidad || 0) - (a.capacidad || 0));
  renderizarProductos(productos);
  alert('Productos ordenados por capacidad (Mayor a Menor)');
}

document.getElementById('sortAZButton').addEventListener('click', ordenarAZ);
document.getElementById('sortZAButton').addEventListener('click', ordenarZA);
document.getElementById('sortCapacidadAscButton').addEventListener('click', ordenarCapacidadAsc);
document.getElementById('sortCapacidadDescButton').addEventListener('click', ordenarCapacidadDesc);

// FUNCION PARA FILTRAR LOS PRODUCTOS SEGUN LA BÚSQUEDA
function filtrarProductos(productos, termino) {
  return productos.filter(producto => producto.nombre.toLowerCase().includes(termino.toLowerCase()));
}

document.getElementById('searchButton').addEventListener('click', function () {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const productosFiltrados = filtrarProductos(productos, searchTerm);
  renderizarProductos(productosFiltrados);
});

// Cargar y renderizar los productos al cargar la página
window.onload = async function() {
  const { productos } = await cargarDatosProductos();
  renderizarProductos(productos);
};
