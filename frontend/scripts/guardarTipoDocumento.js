document.getElementById('formRegistroTipoDocumento')
.addEventListener('submit', async function(event) {
  event.preventDefault();

  // Obtener datos del formulario
  const nombreCorto = document.getElementById('nombreCorto').value.trim()
  .toUpperCase().replace(/\./g, '');
  const nombreLargo = document.getElementById('nombbreLargo').value.trim();

  // Validar campos (si quieres)
  if (!nombreCorto || !nombreLargo) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Crear objeto con datos
  const data = {
    nombre_corto: nombreCorto,
    nombre_largo: nombreLargo
  };

  try {
    const apiUrl = 'http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=documents';
    const apiKey = localStorage.getItem('KeyAPI');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const result = await response.json();

    alert('Tipo de documento creado correctamente.');
    localStorage.removeItem("tipoDocumentoSeleccionado");
    // Opcional: limpiar formulario
    this.reset();

    window.parent.postMessage({ accion: "cerrarModalTipoDocumento" }, "*");
    window.parent.postMessage({ accion: "deshabilitarBotonesTipoDoc" }, "*");
    // Opcional: actualizar tabla o interfaz si tienes alguna

    // Notificar al padre que se debe recargar el select
if (window.parent !== window) {
  window.parent.postMessage({ accion: 'recargarDocumentos' }, '*');

}


  } catch (error) {
    console.error('Error al crear tipo de documento:', error);
    alert('No se pudo crear el tipo de documento. Intenta nuevamente.');

  }
});
