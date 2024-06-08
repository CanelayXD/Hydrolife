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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar datos
    const { accesorios } = await cargarAccesorios();

    // Imprimir los accesorios cargados
    console.log('Accesorios cargados:', accesorios);

    // Renderizar accesorios
    renderizarAccesorios(accesorios);

    // Asignar funciones a eventos
    document.getElementById('sortAZButton').addEventListener('click', ordenarAZAccesorios);
    document.getElementById('sortZAButton').addEventListener('click', ordenarZAAccesorios);
  } catch (error) {
    console.error(error);
  }

  // Accesorios.js

// Función para cargar y renderizar los accesorios
function loadAccesorios() {
    fetch('data/accesorios.json')
      .then(response => response.json())
      .then(accesorios => {
        const accesoriosList = document.getElementById("accesoriosList");
        accesoriosList.innerHTML = ""; // Limpiar el contenido previo
  
        // Verificar si hay accesorios disponibles
        if (!accesorios || accesorios.length === 0) {
          console.log('No hay accesorios disponibles.');
          return;
        }
  
        // Iterar sobre cada accesorio y renderizarlo en la página
        accesorios.forEach(accesorio => {
          const accesorioCard = document.createElement("div");
          accesorioCard.classList.add("accesorio-card");
  
          const accesorioImage = document.createElement("img");
          accesorioImage.src = accesorio.image;
          accesorioImage.alt = accesorio.name;
  
          const accesorioDetails = document.createElement("div");
          accesorioDetails.classList.add("accesorio-details");
  
          const accesorioName = document.createElement("h3");
          accesorioName.textContent = accesorio.name;
  
          const accesorioPrice = document.createElement("p");
          accesorioPrice.textContent = `Precio: $${accesorio.price}`;
  
          // Añadir los elementos creados a las tarjetas y luego al contenedor
          accesorioDetails.appendChild(accesorioName);
          accesorioDetails.appendChild(accesorioPrice);
          accesorioCard.appendChild(accesorioImage);
          accesorioCard.appendChild(accesorioDetails);
          accesoriosList.appendChild(accesorioCard);
  
          // Muestra el accesorio en la consola
          console.log('Accesorio:', {
            nombre: accesorio.name,
            precio: accesorio.price,
            imagen: accesorio.image
          });
        });
      })
      .catch(error => console.error('Error al cargar los accesorios:', error));
  }
  
  // Llamar a la función para cargar y mostrar los accesorios
  loadAccesorios();
  
});
