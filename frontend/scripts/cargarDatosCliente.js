window.addEventListener('message', (event) => {
  if (!event.data || event.data.accion !== 'cargarDatos') return;

  const datos = event.data.datos;

  if (datos) {
    // Modo editar: llenar los campos
    document.getElementById("nombres").value = datos.nombre || '';
    document.getElementById("apellidos").value = datos.apellido || '';
    document.getElementById("telefono").value = datos.telefono || '';
    
const textoTipoDoc = datos.tipoDoc.trim();
const select = document.getElementById("tipoDocmodalFW");
const opcionEncontrada = Array.from(select.options).find(
  option => option.textContent.trim() === textoTipoDoc
);

if (opcionEncontrada) {
  select.value = opcionEncontrada.value;
  
}

    document.getElementById("numeroidentificacion").value = datos.identificacion || '';
    document.getElementById("email").value = datos.correo || '';
  } else {
    // Modo nuevo: limpiar el formulario
    document.getElementById("formRegistroCliente").reset();
  }
});

 