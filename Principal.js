$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });

  // Función para inicializar usuarios y gestionar el enlace de inicio de sesión
  function inicializarUsuarios() {
    // Verificar si hay un usuario logueado
    const userId = localStorage.getItem('userId');
    const iniciarSesionLink = document.querySelector('.iniciar-sesion-link');

    if (userId) {
      // Si hay un usuario logueado, cambiar el texto del enlace y su href
      iniciarSesionLink.textContent = 'Mi cuenta';
      iniciarSesionLink.href = 'perfil.html';
    } else {
      // Si no hay un usuario logueado, dejar el texto del enlace como "Iniciar Sesión" y su href como "Login.html"
      iniciarSesionLink.textContent = 'Iniciar Sesión';
      iniciarSesionLink.href = 'Login.html';
    }
  }

  // Llamar a la función para inicializar usuarios al cargar el documento
  inicializarUsuarios();
});
