document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistroTipoDocumento");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputCorto = document.getElementById("nombreCorto").value.trim();
    const inputLargo = document.getElementById("nombreLargo").value.trim();

    const datosGuardados = JSON.parse(localStorage.getItem("tipoDocumentoSeleccionado") || "{}");
    const id = datosGuardados.id;

    if (!id) {
      console.error("ID del documento no encontrado en localStorage");
      return;
    }

    const url = `http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=documents/${id}`;
    const apiKey = localStorage.getItem("KeyAPI");

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey
      },
      body: JSON.stringify({
        nombre_corto: inputCorto,
        nombre_largo: inputLargo
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al actualizar el tipo de documento");
      }
      return response.json();
    })
    .then(data => {
      alert("✅ Tipo de documento editado correctamente.");
      localStorage.removeItem("tipoDocumentoSeleccionado");
      
      // Informar al padre que recargue el select y cierre el modal
      window.parent.postMessage({ accion: "recargarDocumentos" }, "*");
      window.parent.postMessage({ accion: "cerrarModalTipoDocumento" }, "*");
      window.parent.postMessage({ accion: "deshabilitarBotonesTipoDoc" }, "*");
    })
    .catch(error => {
      console.error("Error en la actualización:", error);
      alert("❌ Ocurrió un error al actualizar el tipo de documento.");
    });
  });
});
