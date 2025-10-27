document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("KeyAPI");
  const nombre = localStorage.getItem("nombreUsuario");
  
  if (!token) {
    alert("Debes iniciar sesión.");
    window.location.href = "../index.html";
    return;
  }

  alert("Bienvenido: ",nombre);
});
