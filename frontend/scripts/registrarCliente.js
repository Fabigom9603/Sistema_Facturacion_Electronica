document.addEventListener("DOMContentLoaded", () => {

  let accion = 'nuevo';  // Por defecto
  let idCliente = null;  // Por defecto sin id

window.addEventListener('message', (event) => {
  if (!event.data || event.data.accion !== 'cargarDatos') return;
  accion = event.data.tipoAccion || 'nuevo';
  const datos = event.data.datos;
  idCliente = datos.id || null;

  if (datos) {
    // Modo editar: llenar los campos
    document.getElementById("nombres").value = datos.nombre || '';
    document.getElementById("apellidos").value = datos.apellido || '';
    document.getElementById("telefono").value = datos.telefono || '';

    // Cargar Tipo Documento
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


  const apiUrlBase = "http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=persons";
  const apiKey = localStorage.getItem("KeyAPI");
  const form = document.getElementById("formRegistroCliente");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      name: document.getElementById("nombres").value.trim(),
      lastName: document.getElementById("apellidos").value.trim(),
      phone: document.getElementById("telefono").value.trim(),
      document_type: document.getElementById("tipoDocmodalFW").value.trim(),
      IdentityDocument: document.getElementById("numeroidentificacion").value.trim(),
      email: document.getElementById("email").value.trim(),
      idPais: document.getElementById("selectCountry").value.trim(),
      idEstado: document.getElementById("selectState").value.trim(),
      idCiudad: document.getElementById("selectCity").value.trim()
    };
    console.log(data);
    let url = apiUrlBase;
    let method = 'POST';

    if (accion === 'editar' && idCliente) {
      // Usar PUT y agregar id a la URL (según tu API)
      url = `${apiUrlBase}/${idCliente}`;
      method = 'PUT';
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }

      const result = await response.json();

      form.reset();
      alert(accion === 'editar' ? "Cliente actualizado correctamente" : "Cliente registrado correctamente");

      window.parent.bootstrap.Modal.getInstance(
        window.parent.document.getElementById("modalRegistroClienteFW")
      )?.hide();

      window.parent.cargarTablaClientes();

    } catch (error) {
      console.error(`Error al ${accion === 'editar' ? "actualizar" : "registrar"} el cliente:`, error);
      alert(`Ocurrió un error al ${accion === 'editar' ? "actualizar" : "registrar"} el cliente`);
    }
  });
});
