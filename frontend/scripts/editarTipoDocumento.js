window.addEventListener('message', (event) => {
  if (event.data?.accion === 'cargarDatos' && event.data.datos) {
    cargarDatosFormulario(event.data.datos);
  }
});

function cargarDatosFormulario(datos) {
  document.getElementById("nombreCorto").value = datos.valor || "";
  document.getElementById("nombreLargo").value = datos.texto || "";
}
