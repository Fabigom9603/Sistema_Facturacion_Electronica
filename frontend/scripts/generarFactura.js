// Suponiendo que tienes algunas variables dinámicas
const boton = document.getElementById("guardarBtn");
boton.addEventListener("click", function () {
  // Aquí puedes usar la variable como necesites
const nit = "90312569874";
const numeroResolucion = "18760000001";
const consecutivoDcto = "990000001";
const prefijoDcto = "SETP";
let fechaVencimiento = new Date().toISOString().split('T')[0];
const fechaVencimientoselect = document.getElementById("fecha").value ;
if (fechaVencimientoselect && fechaVencimientoselect.trim() !== ""){
  fechaVencimiento = fechaVencimientoselect;
}
const formaPago = document.getElementById("metodoDePago").value;
const mediosPago = [document.getElementById("medioDePago").value];

const total = parseFloat(document.getElementById("totalFactura").textContent.replace(/[^0-9.-]+/g, ""));
let observacion =  document.getElementById("tipoFactura").options[document.getElementById("tipoFactura").selectedIndex].text;

const cliente = window.selectedClient;
const itemsSeleccionados = generarItemsDesdeTabla();

// Crear el objeto JSON con datos dinámicos
if (!cliente || itemsSeleccionados.length === 0) {
  alert("Por favor, seleccione un cliente e ingrese productos a la factura.");
  return; // Detener ejecución
}

if (observacion === "" || observacion.toLowerCase() === "seleccione una opción") {
  observacion = "Factura electrónica de Venta";
}

if (formaPago === "" || mediosPago === "") {
  alert("Por favor, seleccione Medio de pago y método de pago.");
  return; // Detener ejecución
}

if (formaPago === "2" && fechaVencimientoselect === "") {
  alert("Seleccione una fecha de vencimiento de la factura");
  return; // Detener ejecución
}
const factura = {
  nit: nit,
  numeroResolucion: numeroResolucion,
  consecutivoDcto: consecutivoDcto,
  prefijoDcto: prefijoDcto,
  fechaVencimiento: fechaVencimiento,
  formaPago: formaPago,
  mediosPago: mediosPago,
  total: total,
  observacion: observacion,
  cliente: cliente,
  items:itemsSeleccionados
};

/*Generar documento .txt e imprimir con el JSON
const jsonString = JSON.stringify(factura, null, 2);
const blob = new Blob([jsonString], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "facturaGenerada.txt";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
*/

enviarFactura(factura);
});

function generarItemsDesdeTabla() {
  
  const filas = document.querySelectorAll("#tablaProductos tbody tr");
  const items = [];

  filas.forEach(fila => {
    const codigo = fila.querySelector(".codigo").textContent.trim();

    const cantidadCelda = fila.querySelector(".cantidad"); 
    const cantidad = cantidadCelda ? parseFloat(cantidadCelda.textContent) || 0 : 0; 

    const descuentoCelda = fila.querySelector(".descuento");
    const descuento = descuentoCelda ? parseFloat(descuentoCelda.textContent) || 0 : 0;

    // Buscar el producto completo en el JSON cargado
    const producto = window.productosJSON.find(p => p.codigo === codigo);

    if (producto) {
      let productoFinal = { ...producto, cantidad: cantidad };

      if(descuento>0){
       productoFinal.valorDescuento = descuento;
      }
      items.push(productoFinal); // Se agrega el objeto completo tal como está
    } else {
      console.warn(`Producto con código ${codigo} no encontrado en productosCargados`);
    }
  });
  return items;
}

// Enviar el JSON a la API de Clarisa con fetch
function enviarFactura(factura){
  console.log("JSON Generado : ",factura);
  const existeFactura = 
    factura.cliente &&
    Array.isArray(factura.items) &&
    factura.items.length > 0 &&
    factura.total > 0 &&
    factura.fechaVencimiento;
  console.log("Cliente",factura.cliente);
  console.log("Items: ",factura.items) ; 
  console.log("Total: ",factura.total) ;
  console.log("fechaVencimiento: ",factura.fechaVencimiento) ;
  console.log("existeFactura:",existeFactura);  

  if (!existeFactura) {
    alert("Faltan datos obligatorios en la factura.");
    return;
  }
const apiUrl = "https://pru.clarisacloud.com:8443/api/factura/rest/v1/factura/nacional";
const tokenClarisa = localStorage.getItem("clarisaToken");

fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": tokenClarisa // Asegúrate que incluya "Bearer "
  },
  body: JSON.stringify(factura)
})
.then(async response => {
  const data = await response.json();

  //Caso éxito (API devolvió success: true)
  if (response.ok && data.success === true) {
    alert("FACTURA ENVIADA CORRECTAMENTE");
  } 
  else {
    // Caso error de validación o fallo de negocio
    const errorDetail = data?.data?.errores?.[0]?.errorMessage || "Error desconocido en la factura.";
    const textResponse = data?.textResponse || "Error procesando la factura.";

    alert(textResponse + "\n" +"Detalle: " + errorDetail);
  }
})
.catch(error => {
  // ⚠️ Caso error de red o servidor caído
  alert(
    "ERROR DE CONEXIÓN O SERVIDOR\n\n" +
    "No se pudo conectar con el servicio de facturación.\n" +
    "Detalles: " + error.message
  );
});
}
