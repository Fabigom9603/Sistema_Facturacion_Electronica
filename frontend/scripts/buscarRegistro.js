document.getElementById("btnBuscar").addEventListener("click", () => {
  const filtro = document.getElementById("selectFiltro").value; // e.g. 'name'
  const valorInput = document.getElementById("inputBuscar").value.trim().toString().toLowerCase();

  if (!valorInput) {
    alert("Por favor ingresa un valor para buscar");
    return;
  }

  // Paso 1: obtener todos los registros
  const url1 = "http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=personsview";
  const apiKey = localStorage.getItem("KeyAPI");
  
  fetch(url1, {
    method: 'GET',
    headers: {
      'Authorization': apiKey
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener los datos");
      return res.json();
    })
    .then(response => {
      if (response.state !== "OK") throw new Error("Error en la respuesta del servidor");
      
      // data.data es el array de registros
      const registros = response.data;

      // Paso 2: filtrar localmente
      const filtrados = registros.filter(item => {
        if (!item[filtro]) return false;
        return item[filtro].toString().toLowerCase().includes(valorInput);
      });

      if (filtrados.length === 0) {
        alert("No se encontraron registros que coincidan");
        return;
      }

      // Obtener IDs que coincidan
      const ids = filtrados.map(item => item.id);
      console.log("Listado IDs: ", ids);

      // Paso 3: buscar datos completos por esos IDs
      buscarPorIDs(ids);
    })
    .catch(err => {
      console.error("Error en la búsqueda:", err);
      alert("Error al obtener los datos");
    });
});

function buscarPorIDs(ids) {
  const apiKey = localStorage.getItem("KeyAPI");
  const cuerpoTabla = document.getElementById("cuerpoTablaClientes");
  cuerpoTabla.innerHTML = ""; // Limpiar tabla antes de comenzar

  // Función para buscar por un solo ID
  function buscarPorID(id) {
     const url = `http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=personsview/${id}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': apiKey
      }
    }).then(res => {
      if (!res.ok) throw new Error("Error al obtener datos para ID " + id);
      return res.json();
    });
  }

  // Promesas para todas las peticiones
  const promesas = ids.map(id => buscarPorID(id));

  // Esperar a que todas terminen
  Promise.all(promesas)
    .then(resultados => {
      // resultados es un array con las respuestas de cada id
      resultados.forEach(dataCompleta => {
        if (dataCompleta && dataCompleta.data) {
          dataCompleta.data.forEach(item => {
            const fila = document.createElement("tr");
            fila.setAttribute('data-id', item.id);
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
        }
      });
    })
    .catch(err => {
      console.error(err);
      alert("Error al obtener los datos completos");
    });
}