document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombreUsuario");
  if (nombre) {
    document.getElementById("nombreUsuarioDropdown").textContent = nombre;
  }
});