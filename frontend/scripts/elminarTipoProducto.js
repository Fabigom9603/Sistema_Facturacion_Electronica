document.addEventListener("DOMContentLoaded", () => {
  const btnEliminar = document.getElementById("btnEliminar");
  

  btnEliminar.addEventListener("click", () => {
    const datos = JSON.parse(localStorage.getItem("tipoDocumentoSeleccionado") || "{}");
    const id = datos.id;
    const nombreLargo = datos.texto || "este tipo de documento"; // nombre largo para mostrar

    if (!id) {
      alert("No se encontró el ID del tipo de documento.");
      return;
    }

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el tipo de documento "${nombreLargo}"?`);
    if (!confirmacion) return;

    const apiKey = localStorage.getItem("KeyAPI");
    const url = `http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=documents/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": apiKey
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al eliminar el tipo de documento");
      }

      // Limpiar el localStorage
      localStorage.removeItem("tipoDocumentoSeleccionado");

      // Informar al padre que recargue los documentos
      obtenerDocumentosTransformadosYcargar("tipoDocmodalFW"); 

      // Mostrar alerta
      alert(`Tipo de documento "${nombreLargo}" eliminado correctamente`);
      // Opcional: deshabilitar botones
      btnEliminar.disabled = true;
      document.getElementById("btnEditar").disabled = true;

      btnEliminar.classList.remove("btn-danger");
      btnEliminar.classList.add("btn-secondary");

      document.getElementById("btnEditar").classList.remove("btn-warning");
      document.getElementById("btnEditar").classList.add("btn-secondary");
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Hubo un problema al intentar eliminar el tipo de documento.");
    });
  });
});
