document.addEventListener("DOMContentLoaded", () => {
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {
    backdrop: "static",
    keyboard: false
  });

  // Mostrar el modal solo si no hay token
  if (!localStorage.getItem("token")) {
    loginModal.show();
  }

  // Escuchar mensajes desde el iframe (cuando se autentique correctamente)
  window.addEventListener("message", (event) => {
    if (event.data === "loginSuccess") {
      loginModal.hide();
    }
  });
});

