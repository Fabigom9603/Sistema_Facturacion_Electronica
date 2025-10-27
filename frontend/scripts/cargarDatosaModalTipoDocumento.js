document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modaledicionTipoDoc');
  const iframe = document.getElementById('edicionTipoDocModal');

  modal.addEventListener('shown.bs.modal', () => {
    const datos = JSON.parse(localStorage.getItem('tipoDocumentoSeleccionado') || '{}');

    // Si el iframe ya estaba cargado
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        accion: 'cargarDatos',
        datos
      }, '*');
    } else {
      // Esperar a que cargue el iframe
      iframe.onload = () => {
        iframe.contentWindow.postMessage({
          accion: 'cargarDatos',
          datos
        }, '*');
      };
    }
  });
});

