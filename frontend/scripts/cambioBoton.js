const modalElement = document.getElementById('modalRegistroClienteFW');
const iframe = document.getElementById('registroClienteFrameFW');

modalElement.addEventListener('show.bs.modal', (event) => {
  const button = event.relatedTarget; // botón que abrió el modal
  const tipoAccion = button?.getAttribute('data-accion') || 'nuevo';

  let datos = null;

  if (tipoAccion === 'editar') {
    const datosGuardados = localStorage.getItem('clienteSeleccionado');
    if (datosGuardados) {
      try {
        datos = JSON.parse(datosGuardados);
      } catch {
        datos = null;
      }
    }
  } else {
    // Si es nuevo, asegurarse de limpiar los datos guardados
    localStorage.removeItem('clienteSeleccionado');
  }

  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ 
      accion: 'cargarDatos', 
      datos, 
      tipoAccion 
    }, '*');
  }
});

