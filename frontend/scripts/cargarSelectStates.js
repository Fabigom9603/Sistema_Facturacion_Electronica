function obtenerStates(idSelect) {
    const select = document.getElementById("selectCountry");
    const idCountry = select.value;

  const url = `http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=states/countryId/${idCountry}`;
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
      option.dataset.id = opcion.id;
      select.appendChild(option);
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const selectCountry = document.getElementById("selectCountry");
  
  selectCountry.addEventListener("change", () => {
    if (selectCountry.value === "") {
    // Vaciar listado del select de estados
    selectState.innerHTML = '<option value="">Seleccione una opción</option>';
  } else {
    // Si seleccionó un país válido, cargar estados
    obtenerStates("selectState");
  }
  });
});