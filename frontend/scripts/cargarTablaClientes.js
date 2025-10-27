const url = "http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=personsview";
const apiKey = localStorage.getItem("KeyAPI");

function cargarTablaClientes() {
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
      if (!json || !json.data) {
        console.warn("No hay datos para mostrar");
        return;
      }

      const cuerpoTabla = document.getElementById("cuerpoTablaClientes");
      cuerpoTabla.innerHTML = ""; // Limpiar tabla

      json.data.forEach(item => {
        const fila = document.createElement("tr");
        fila.setAttribute('data-id', item.id);
        fila.setAttribute('data-idPais', JSON.stringify(item.idPais)); 
        fila.setAttribute('data-idEstado', JSON.stringify(item.idEstado)); 
        fila.setAttribute('data-idCiudad', JSON.stringify(item.idCiudad)); 
        fila.innerHTML = `
          <td>${item.name || ''}</td>
          <td>${item.lastName || ''}</td>
          <td>${item.phone || ''}</td>
          <td>${item.document_type_long || ''}</td>
          <td>${item.IdentityDocument || ''}</td>
          <td>${item.email || ''}</td>
        `;

        cuerpoTabla.appendChild(fila);
      });
    })
    .catch(error => {
      console.error("Error al cargar la tabla de clientes:", error);
    });
  }

  // Ejecutar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    cargarTablaClientes();
  });