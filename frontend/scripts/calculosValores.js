

document.addEventListener("DOMContentLoaded", () => {
  if (window.productosJSON && typeof window.productosJSON.then === 'function') {
      window.productosJSON.then(() => {
      calcularImpuestosDesdeTabla(); // o la función que uses
      document.getElementById("descuentoGlobal").addEventListener("input", calcularImpuestosDesdeTabla);
      document.getElementById("recargoGlobal").addEventListener("input", calcularImpuestosDesdeTabla);
    });
  } else {
    console.warn("La promesa productosCargados no está disponible.");
  }
});


function calcularImpuestosDesdeTabla() {

  let totalIVA = 0;
  let totalIBUA = 0;
  let totalICPD = 0;
  let totalICDN = 0;
  let totalICUI = 0;
  let totalINCB = 0;
  let totalImpuestos = 0;
  let totalDescuentos = 0;
  let totalRecargos = 0;
  let subtotal = 0;
  let totalBaseGravable = 0;
  

  const filas = document.querySelectorAll("#tablaProductos tbody tr"); // Ajusta el selector a tu tabla

  filas.forEach(fila => {
    let impuestoProducto = 0;
    const codigo = fila.cells[0].textContent.trim();//Codigo del producto
    const baseGravable = parseFloat(fila.cells[7].textContent); // Ajusta al índice correcto
    subtotal+=baseGravable;
    const descuentoItem = parseFloat(fila.cells[5].textContent);
    totalDescuentos+=descuentoItem;
    const recargoItem = parseFloat(fila.cells[6].textContent);
    totalRecargos+=recargoItem;
    const producto = productosJSON.find(p => p.codigo === codigo);//Buscar por codigo producto en el JSON
    if (!producto || !producto.impuestos) return;
    //Buscar y calcular los impuestos dependiendo del tipo por producto
    producto.impuestos.forEach(impuesto => {
          let impuestoCalculado = 0;
          
          switch (impuesto.tipo) {//Calcular dependiendo tipo
          case "IVA":
          case "ICPD":
          case "ICUI":
            impuestoCalculado = (baseGravable * impuesto.tarifaTributo) / 100;
            break;

          case "IBUA":
          case "ICDN":
            impuestoCalculado = (baseGravable / impuesto.factor) * impuesto.tarifaTributo;
           
            break;

          case "INCB":
             let cantidad = 0;
             if(codigo === "TC21"){
             cantidad = parseInt(fila.cells[2].textContent);
            }
            impuestoCalculado = cantidad * impuesto.tarifaTributo;
            
            break;

          default:
            console.warn("Tipo de impuesto no reconocido:", impuesto.tipo);
            break;
        }
        impuestoProducto+=impuestoCalculado
        // Acumulación por tipo
        switch (impuesto.tipo) {
          case "IVA":
            totalIVA += impuestoCalculado;
            
            break;
          case "IBUA":
            totalIBUA += impuestoCalculado;
            
            break;
          case "ICPD":
            totalICPD += impuestoCalculado;
            
            break;
          case "ICDN":
            totalICDN += impuestoCalculado;
            
            break;
          case "ICUI":
            totalICUI += impuestoCalculado;
            
            break;
          case "INCB":
            totalINCB += impuestoCalculado;
            
            break;
        }
      });totalBaseGravable += baseGravable - impuestoProducto;
});


const porcentajeDescuentoGlobal = parseFloat(document.getElementById("descuentoGlobal").value) || 0;
const porcentajeRecargoGlobal = parseFloat(document.getElementById("recargoGlobal").value) || 0;

 let totalINC=totalICPD+totalICDN;   
 let totalImpuestosAzucarados=totalIBUA+totalICUI;
 totalImpuestos=totalImpuestosAzucarados+totalINC+totalIVA+totalINCB;
 
    let descuentoGlobal = (porcentajeDescuentoGlobal*subtotal)/100;
    let recargoGlobal = (porcentajeRecargoGlobal*subtotal)/100;
    let totalFactura = subtotal-descuentoGlobal+recargoGlobal;
    document.getElementById("valorDescuentoGlobbal").textContent = `$ ${descuentoGlobal.toFixed(2)}`;
    document.getElementById("valorRecargoGlobbal").textContent = `$ ${recargoGlobal.toFixed(2)}`;
    document.getElementById("totalFactura").textContent = `$ ${totalFactura.toFixed(2)}`;

 document.getElementById("totalINC").textContent = `$ ${totalINC.toFixed(2)}`;
 document.getElementById("totalAzucarados").textContent = `$ ${totalImpuestosAzucarados.toFixed(2)}`;
 document.getElementById("totalIVA").textContent = `$ ${totalIVA.toFixed(2)}`;
 document.getElementById("totalBolsas").textContent = `$ ${totalINCB.toFixed(2)}`;
 document.getElementById("totalImpuestos").textContent = `$ ${totalImpuestos.toFixed(2)}`;
 document.getElementById("totalDescuentos").textContent = `$ ${totalDescuentos.toFixed(2)}`;
 document.getElementById("totalRecargos").textContent = `$ ${totalRecargos.toFixed(2)}`;
 document.getElementById("subTotal").textContent = `$ ${subtotal.toFixed(2)}`;
 document.getElementById("totalBaseGravable").textContent = `$ ${totalBaseGravable.toFixed(2)}`;
 }

