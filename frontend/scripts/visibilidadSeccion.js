// Selecciona todos los enlaces del menú
const menuLinks = document.querySelectorAll('.menu-link');

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('data-target');
    const targetDiv = document.querySelector(targetId);

    // Oculta todos los contenedores
    document.querySelectorAll('.collapse').forEach(div => {
      if (div !== targetDiv) {
        div.classList.remove('show'); // Cierra los demás
      }
    });

    // Alterna la visibilidad del contenedor seleccionado
    targetDiv.classList.toggle('show');
  });
});