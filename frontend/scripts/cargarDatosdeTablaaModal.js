document.getElementById("btnEditar").addEventListener("click", function () {
  if (!datosSeleccionados) return;

  // Llenar los campos del modal
  document.getElementById("inputNombre").value = datosSeleccionados.nombre;
  document.getElementById("inputApellido").value = datosSeleccionados.apellido;
  document.getElementById("inputTelefono").value = datosSeleccionados.telefono;
  document.getElementById("inputTipoDoc").value = datosSeleccionados.tipoDoc;
  document.getElementById("inputIdentificacion").value = datosSeleccionados.identificacion;
  document.getElementById("inputCorreo").value = datosSeleccionados.correo;
});