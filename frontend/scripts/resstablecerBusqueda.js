document.getElementById("btnReset").addEventListener("click", () => {
  // Limpia los inputs si quieres
  document.getElementById("inputBuscar").value = "";
  document.getElementById("selectFiltro").value = "nombre"; // valor por defecto

  cargarTablaClientes();
});