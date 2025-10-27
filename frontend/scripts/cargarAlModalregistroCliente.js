function cargarOpcionesDesdeJSON(rutaJSON, idSelect) {
  fetch(rutaJSON)
  return fetch(rutaJSON) 
    .then(res => {
      if (!res.ok) {
        throw new Error("No se pudo cargar el archivo JSON");
      }
      return res.json();
    })
    .then(opciones => {
      const select = document.getElementById(idSelect);
      if (!select) {
        console.warn(`No se encontró el select con id: ${idSelect}`);
        return;
      }
      // Limpiar opciones anteriores si existen
      select.innerHTML = '<option value="">Seleccione una opción</option>';
      
      opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.codigo;
        option.textContent = opcion.nombre;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error(`Error al cargar opciones en #${idSelect}:`, error);
    });
}

 function transformarDocumentos(json) {
  // json es el objeto completo que tiene "state", "code" y "data"
  if (!json || !json.data) return [];

  return json.data.map(item => ({
    nombre: item.nombre_largo,
    codigo: item.nombre_corto.replace(/\./g, '') // quitar puntos
  }));
}

 document.addEventListener("DOMContentLoaded", () => {

 
  // Cargar diferentes selects con distintos JSON
  cargarOpcionesDesdeJSON("../JSON/departamentos.json", "departamentoSelect");

});

document.getElementById("departamentoSelect").addEventListener("change", function() {
  const departamento = this.value;
  const ciudadSelect = document.getElementById("ciudadSelect");

  // Limpiar el select de ciudades
  ciudadSelect.innerHTML = '<option value="">-- Selecciona una ciudad --</option>';

  if (!departamento) return; // Si no hay selección, no hacer nada

  // Ruta del archivo JSON según departamento seleccionado
  const url = `../JSON/codigosCiudades/${departamento}.json`;


  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
      return response.json();
    })
    .then(data => {
      // data es un array con objetos { Ciudad, Departamento, CodigoDIAN }
      data.forEach(ciudadObj => {
        const option = document.createElement("option");
        option.value = ciudadObj.CodigoDIAN; // o ciudadObj.Ciudad, según prefieras
        option.textContent = ciudadObj.Ciudad;
        ciudadSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error cargando JSON:", error);
    });
});