document.getElementById("agregarBtn").addEventListener("click", function () {
  const productoSelect = document.getElementById("productos");
  const cantidad = parseFloat(document.getElementById("cantidadInput").value) || 0;
  const precioUnitario = parseFloat(document.getElementById("precioUnidad").value) || 0;
  const descuento = parseFloat(document.getElementById("descuentoInput").value) || 0;
  const recargo = parseFloat(document.getElementById("recargoInput").value) || 0;
  const valorItemInput = parseFloat(document.getElementById("valorXItem").value) || 0;
  const codigo = document.getElementById("productos").value;
  const nombreProducto = productoSelect.options[productoSelect.selectedIndex].text;
  const valorDescuento = (valorItemInput * descuento) / 100;
  const valorRecargo = (valorItemInput * recargo) / 100;
  const valorNeto = valorItemInput - valorDescuento + valorRecargo;
  const tabla = document.getElementById("tablaProductos").querySelector("tbody");
  const fila = tabla.insertRow();

fila.innerHTML = `
  <td class="codigo">${codigo}</td>
  <td class="producto">${nombreProducto}</td>
  <td class="cantidad">${cantidad.toFixed(2)}</td>
  <td class="precio">${precioUnitario.toFixed(2)}</td>
  <td class="Valor-bruto-item">${valorItemInput.toFixed(2)}</td>
  <td class="descuento">${valorDescuento.toFixed(2)}</td>
  <td class="recargo">${valorRecargo.toFixed(2)}</td>
  <td class="Valor-neto-item">${valorNeto.toFixed(2)}</td>
  <td class="quitarProducto">
    <button class="btn btn-link p-0 btnQuitar" title="Eliminar producto">
      <i class="bi bi-dash-circle text-danger fs-5"></i>
    </button>
  </td>
`;

const btnQuitar = fila.querySelector(".btnQuitar");

btnQuitar.addEventListener("click", () => {
  fila.remove(); // Elimina la fila completa
  calcularImpuestosDesdeTabla(); // Recalcula totales después de quitar
});

  // Opcional: limpiar inputs después de agregar
document.getElementById("productos").selectedIndex = 0; 
document.getElementById("cantidadInput").value = 0;
document.getElementById("precioUnidad").value = 0;
document.getElementById("valorXItem").value = 0;
document.getElementById("descuentoInput").value = 0;
document.getElementById("recargoInput").value = 0;
calcularImpuestosDesdeTabla();
});