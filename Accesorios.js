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
    return { accesorios: [] }; // Si hay un error, retorna accesorios vacíos
  }
}

// Función para renderizar los accesorios en la página
function renderizarAccesorios(accesorios) {
  const accessoryContainer = document.getElementById('accessoryContainer');
  accessoryContainer.innerHTML = '';
  accesorios.forEach(accesorio => {
    const card = document.createElement('div');
    card.classList.add('tarjeta-accesorio');
    
    const img = document.createElement('img');
    img.src = accesorio.imagen;
    img.alt = accesorio.nombre;
    img.title = accesorio.nombre;
    
    const content = document.createElement('div');
    content.classList.add('contenido');
    
    const name = document.createElement('h2');
    name.textContent = accesorio.nombre;
    
    const link = document.createElement('a');
    link.href = accesorio.url;
    const button = document.createElement('button');
    button.classList.add('boton');
    button.textContent = "Ver detalles";
    
    link.appendChild(button);
    content.appendChild(name);
    content.appendChild(link);
    card.appendChild(img);
    card.appendChild(content);
    accessoryContainer.appendChild(card);
  });
}

// Evento de carga de la página
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { accesorios } = await cargarDatos();
    console.log('Accesorios cargados:', accesorios);
    renderizarAccesorios(accesorios);
  } catch (error) {
    console.error(error);
  }
});
