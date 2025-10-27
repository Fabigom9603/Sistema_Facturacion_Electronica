window.productosJSON = [];

function cargarlistaProductos(rutaJSON) {
  return fetch(rutaJSON)
    .then(res => {
      if (!res.ok) {
        throw new Error("No se pudo cargar el archivo JSON");
      }
      return res.json();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  window.productosJSON = cargarlistaProductos("../JSON/listadoProductos.json")
    .then(data => {
      window.productosJSON = data;
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
    });



  const cantidadInput = document.getElementById("cantidadInput");
  const precioUnitarioInput = document.getElementById("precioUnidad");
  const valorItemInput = document.getElementById("valorXItem");

  function calcularValorItem() {
    const cantidad = parseFloat(cantidadInput.value) || 0;
    const precioUnitario = parseFloat(precioUnitarioInput.value) || 0;
    const valor = cantidad * precioUnitario;
    valorItemInput.value = valor.toFixed(2); // formatea a 2 decimales
  }

  // Escuchar cambios en ambos inputs
  cantidadInput.addEventListener("input", calcularValorItem);
  precioUnitarioInput.addEventListener("input", calcularValorItem);
});