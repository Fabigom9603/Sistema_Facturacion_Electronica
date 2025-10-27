const tabla = document.getElementById('tablaClientes');
const btnEditar = document.getElementById('btnEditar');
const btnEliminar = document.getElementById('btnEliminar');
let filaSeleccionada = null;

tabla.addEventListener('click', function(e) {
  const fila = e.target.closest('tr');
  if (!fila) return;

  // Quitar resaltado anterior
  if (filaSeleccionada) {
    filaSeleccionada.classList.remove('table-success');
  }

  // Marcar la fila actual
  filaSeleccionada = fila;
  filaSeleccionada.classList.add('table-success');

  // Activar botones
  btnEditar.disabled = false;
  btnEliminar.disabled = false;

  btnEditar.classList.remove('btn-secondary');
  btnEditar.classList.add('btn-warning');

  btnEliminar.classList.remove('btn-secondary');
  btnEliminar.classList.add('btn-danger');


  const celdas = fila.querySelectorAll("td");
  const id = fila.getAttribute('data-id');
  const idEstado = fila.getAttribute('data-idEstado');
  const idCiudad = fila.getAttribute('data-idCiudad');
  const idPais = fila.getAttribute('data-idPais');
      const datos = {
        id: id,
        nombre: celdas[0].textContent.trim(),
        apellido: celdas[1].textContent.trim(),
        telefono: celdas[2].textContent.trim(),
        tipoDoc: celdas[3].textContent.trim(),
        identificacion: celdas[4].textContent.trim(),
        correo: celdas[5].textContent.trim(),
        idPais: idPais,
        idEstado: idEstado,
        idCiudad: idCiudad
      };

      localStorage.setItem("clienteSeleccionado", JSON.stringify(datos));
});

// Deseleccionar al hacer clic fuera de la tabla o navbar
document.body.addEventListener('click', (e) => {
  // Si el clic no está dentro de la tabla ni dentro del navbar
  if (!tabla.contains(e.target) && !e.target.closest('nav')) {
    if (filaSeleccionada) {
      filaSeleccionada.classList.remove('table-success');
      filaSeleccionada = null;

      // Deshabilitar botones y restaurar colores grises
      btnEditar.disabled = true;
      btnEliminar.disabled = true;

      btnEditar.classList.remove('btn-warning');
      btnEditar.classList.add('btn-secondary');

      btnEliminar.classList.remove('btn-danger');
      btnEliminar.classList.add('btn-secondary');

       localStorage.removeItem('clienteSeleccionado');
        const iframe = document.getElementById('registroClienteFrameFW');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ accion: 'limpiarFormulario' }, '*');
      }
    }
  }
});
