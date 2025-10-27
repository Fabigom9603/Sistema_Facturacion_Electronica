document.getElementById("btnEliminar").addEventListener("click", async () => {
  const apiKey = localStorage.getItem("KeyAPI");
  const datosGuardados = localStorage.getItem("clienteSeleccionado");

  if (!datosGuardados) {
    alert("No hay cliente seleccionado.");
    return;
  }

  const cliente = JSON.parse(datosGuardados);
  const id = cliente.id;

  if (!id) {
    alert("ID de cliente no válido.");
    return;
  }

 const nombreCliente = cliente.nombre || "este cliente";
 const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${nombreCliente}?`);
if (!confirmacion) return;

  const url = `http://localhost/Actividad_Unidad_4/backend/panther/rest/index.php?PATH_INFO=persons/${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": apiKey
      }
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el cliente.");
    }

    alert("Cliente eliminado correctamente.");
    localStorage.removeItem("clienteSeleccionado");
    // Vuelve a cargar la tabla de clientes
    cargarTablaClientes();

  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    alert("Ocurrió un error al eliminar el cliente.");
  }
});
