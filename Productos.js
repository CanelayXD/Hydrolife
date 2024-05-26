let productos = []; // Variable global para almacenar los productos

// FUNCION PARA CARGAR LOS PRODUCTOS DESDE EL JSON
async function cargarDatos() {
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
    var price = document.createElement('p');
    price.classList.add('precio');
    price.textContent = producto.precio;
    var link = document.createElement('a');
    link.href = producto.url;
    var button = document.createElement('button');
    button.classList.add('boton');
    button.textContent = "Ver detalles";

    var cartButton = document.createElement('button');
    cartButton.classList.add('boton', 'boton-carrito');
    cartButton.textContent = "Agregar al carrito";

    // Agregar evento click al botón "Agregar al carrito"
    cartButton.addEventListener('click', function() {
      agregarAlCarrito(producto);
    });

    var favoritesButton = document.createElement('button');
    favoritesButton.classList.add('boton', 'boton-favoritos');
    favoritesButton.textContent = "Agregar a favoritos";

    // Agregar evento click al botón "Agregar a favoritos"
    favoritesButton.addEventListener('click', function() {
      agregarAFavoritos(producto);
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
    productContainer.appendChild(card);
  });
}
// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  var productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
  productosEnCarrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
  alert("Producto agregado al carrito");
}

function agregarAFavoritos(producto) {
  var productosEnFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  productosEnFavoritos.push(producto);
  localStorage.setItem('favoritos', JSON.stringify(productosEnFavoritos));
  alert("Producto agregado a favoritos");
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

// Función para ordenar los productos por precio de mayor a menor
function ordenarPrecioMayorMenor() {
  productos.sort((a, b) => {
    let precioA = parseFloat(a.precio.replace('$', '').replace(' Mx', ''));
    let precioB = parseFloat(b.precio.replace('$', '').replace(' Mx', ''));
    return precioB - precioA;
  });
  renderizarProductos(productos);
  alert('Productos ordenados por precio de mayor a menor');
}

// Función para ordenar los productos por precio de menor a mayor
function ordenarPrecioMenorMayor() {
  productos.sort((a, b) => {
    let precioA = parseFloat(a.precio.replace('$', '').replace(' Mx', ''));
    let precioB = parseFloat(b.precio.replace('$', '').replace(' Mx', ''));
    return precioA - precioB;
  });
  renderizarProductos(productos);
  alert('Productos ordenados por precio de menor a mayor');
}
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('sortAZButton').addEventListener('click', ordenarAZ);
  document.getElementById('sortZAButton').addEventListener('click', ordenarZA);
  document.getElementById('sortPrecioButton').addEventListener('click', ordenarPrecioMayorMenor);
  document.getElementById('sortPrecioMenorButton').addEventListener('click', ordenarPrecioMenorMayor);
});
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

      var price = document.createElement('p');
      price.classList.add('precio');
      price.textContent = producto.precio;

      var link = document.createElement('a');
      link.href = producto.url;

      var button = document.createElement('button');
      button.classList.add('boton');
      button.textContent = "Ver detalles";
      var cartButton = document.createElement('button');
      cartButton.classList.add('boton', 'boton-carrito');
      cartButton.textContent = "Agregar al carrito";
  
      // Agregar evento click al botón "Agregar al carrito"
      cartButton.addEventListener('click', function() {
        agregarAlCarrito(producto);
      });
  
      var favoritesButton = document.createElement('button');
      favoritesButton.classList.add('boton', 'boton-favoritos');
      favoritesButton.textContent = "Agregar a favoritos";
  
      // Agregar evento click al botón "Agregar a favoritos"
      favoritesButton.addEventListener('click', function() {
        agregarAFavoritos(producto);
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
    productContainer.textContent = 'No se encontraron resultados para la búsqueda: ' + searchTerm;
  }
}

// Asignar la función buscarProducto al evento click del botón de búsqueda
document.getElementById('searchButton').addEventListener('click', buscarProducto);

// Función para cargar productos desde localStorage
function loadProductsFromLocalStorage() {
  // Simulación de carga de productos desde localStorage
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    productos = JSON.parse(storedProducts);
  } else {
    productos = []; // Si no hay productos en localStorage, inicializa un array vacío.
  }
}

// Llamar a la función para cargar y mostrar los productos
loadProductsFromLocalStorage();

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

// Función para manejar el evento de ordenar por precio de mayor a menor
document.getElementById('sortPrecioButton').addEventListener('click', ordenarPrecioMayorMenor);

// Función para manejar el evento de ordenar por precio de menor a mayor
document.getElementById('sortPrecioMenorButton').addEventListener('click', ordenarPrecioMenorMayor);

    // Evento de búsqueda
    document.getElementById('searchButton').addEventListener('click', buscarProducto);

    // Resto de los eventos
  } catch (error) {
    console.error(error);
  }
});



