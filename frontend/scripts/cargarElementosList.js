window.selectedClient = null;
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

// Cargar listaado de clientes 
function cargarClientes(rutaJSON, idSelect) {
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
      const input = document.getElementById('nombre');
      if (!select) {
        console.warn(`No se encontró el select con id: ${idSelect}`);
        return;
      }
      // Limpiar opciones anteriores si existen
      select.innerHTML = '<option value="">Seleccione una opción</option>';
      
      opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.tipoIdentificacion+opcion.numIdentificacion;
        option.textContent = opcion.tipoIdentificacion+" - "+opcion.numIdentificacion;
        select.appendChild(option);
      });
        select.addEventListener("change", () => {
        const selectedValue = select.value;
        window.selectedClient = opciones.find(opcion => opcion.tipoIdentificacion + opcion.numIdentificacion === selectedValue);
        if (selectedClient) {
       if (selectedClient.tipoIdentificacion === "NA") {
            const modal = new bootstrap.Modal(document.getElementById('modalIframeCliente'));
            modal.show();
          }
          // Mostrar el nombre del cliente en el input
          input.value = selectedClient.nombreRazonSocial || "Nombre no disponible";
        } else {
          input.value = "";  // Limpiar el campo si no se encuentra el cliente
        }
      });

    })
    .catch(error => {
      console.error(`Error al cargar opciones en #${idSelect}:`, error);
    });


}

function cargarProductos(rutaJSON,idSelect) {
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
      const input = document.getElementById('precioUnidad');
      const cantidad = document.getElementById('cantidadInput');
      if (!select) {
        console.warn(`No se encontró el select con id: ${idSelect}`);
        return;
      }
      // Limpiar opciones anteriores si existen
      select.innerHTML = '<option value="">Seleccione una opción</option>';
      
      opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.codigo;
        option.textContent = opcion.nombreItem;
        select.appendChild(option);
      });
        select.addEventListener("change", () => {
        const selectedValue = select.value;
        const selectedProducto = opciones.find(opcion => opcion.codigo === selectedValue);
        if (selectedProducto) {
          // Mostrar el precio unitario del producto en el input
          input.value = selectedProducto.precioBaseUnitario || 0;
          cantidad.value = 1;
          
        } else {
          input.value = 0;  // Limpiar el campo si no se encuentra el cliente
          cantidad.value = 0;
        }
      });

    })
    .catch(error => {
      console.error(`Error al cargar opciones en #${idSelect}:`, error);
    });


}

  document.addEventListener("DOMContentLoaded", () => {
  // Cargar diferentes selects con distintos JSON
  cargarClientes("../JSON/clientes.json", "tipoDoc");
  cargarProductos("../JSON/listadoProductos.json", "productos");
  cargarOpcionesDesdeJSON("../JSON/mediosDePago.json", "medioDePago");
  cargarOpcionesDesdeJSON("../JSON/metodosPago.json", "metodoDePago");
  cargarOpcionesDesdeJSON("../JSON/tipoFactura.json", "tipoFactura");

  //Cargar al registroClientes
  const iframe = document.getElementById("registroClienteFrame");
    window.addEventListener("message", function (event) {
    if (event.data === "cerrar-modal-cliente") {
      const modalElement = document.getElementById("modalIframeCliente");
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.hide();
    }
  });
});
