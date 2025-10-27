function obtenerCountries(idSelect) {
  const url = "http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=countries";
  const apiKey = localStorage.getItem("KeyAPI");

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener datos del backend");
      }
      return response.json();
    })
    .then(json => {
      if (!json || !json.data) return [];

      const opciones = json.data.map(item => ({
        nombre: item.name,
        codigo: item.id
      }));

      cargarOpcionesDesdeArray(opciones, idSelect);
    })
    .catch(error => {
      console.error("Error en obtenerDocumentosTransformadosYcargar():", error);
    });

  function cargarOpcionesDesdeArray(opciones, idSelect) {
    const select = document.getElementById(idSelect);
    if (!select) {
      console.warn(`No se encontró el select con id: ${idSelect}`);
      return;
    }

    select.innerHTML = '<option value="">Seleccione una opción</option>';
    opciones.forEach(opcion => {
      const option = document.createElement("option");
      option.value = opcion.codigo;
      option.textContent = opcion.nombre;
      select.appendChild(option);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerCountries("selectCountry");
});