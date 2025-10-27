document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("tipoDocmodalFW");
  select.selectedIndex = 0; 
  const btnEditar = document.getElementById("btnEditar");
  const btnEliminar = document.getElementById("btnEliminar");

  select.addEventListener("change", () => {
 
    const opcionSeleccionada = select.options[select.selectedIndex];
    const valor = opcionSeleccionada.value;
    const texto = opcionSeleccionada.textContent;
    const id = opcionSeleccionada.getAttribute("data-id");
  
  // Ahora puedes guardar un objeto con toda esta info:
 

    if (valor ) {
        const datos = { id, valor, texto };
        localStorage.setItem("tipoDocumentoSeleccionado", JSON.stringify(datos));
       
      // Habilitar y cambiar colores
      btnEditar.disabled = false;
      btnEliminar.disabled = false;
      btnEditar.classList.remove("btn-secondary");
      btnEditar.classList.add("btn-warning");
      btnEliminar.classList.remove("btn-secondary");
      btnEliminar.classList.add("btn-danger");
    } else {
      /*// Deshabilitar y volver a gris
      btnEditar.disabled = true;
      btnEliminar.disabled = true;
      btnEditar.classList.remove("btn-warning");
      btnEliminar.classList.remove("btn-danger");
      btnEditar.classList.add("btn-secondary");
      btnEliminar.classList.add("btn-secondary");*/
      deshabilitarBotonesTipoDoc();
    }
  });
});

function deshabilitarBotonesTipoDoc() {
  const btnEditar = document.getElementById("btnEditar");
  const btnEliminar = document.getElementById("btnEliminar");

  if (btnEditar && btnEliminar) {
    btnEditar.disabled = true;
    btnEliminar.disabled = true;
    btnEditar.classList.remove("btn-warning");
    btnEliminar.classList.remove("btn-danger");
    btnEditar.classList.add("btn-secondary");
    btnEliminar.classList.add("btn-secondary");
  }
}