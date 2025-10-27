  document.getElementById("formCliente").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se recargue la página

    const cliente = {
      nombreRazonSocial: document.getElementById("nombreRazonSocial").value.trim(),
      tipoIdentificacion: document.getElementById("tipoDocmodal").value,
      numIdentificacion: document.getElementById("numeroidentificacion").value.trim(),
      naturaleza: document.getElementById("naturaleza").value,
      email: document.getElementById("email").value.trim(),
      respFiscales: document.getElementById("resposabilidadFiscal").value,
      respTributarias: document.getElementById("resposabilidadTribbutaria").value,
      direccion: document.getElementById("direccion").value.trim(),
      ciudad: document.getElementById("ciudadSelect").value,
      telefono: document.getElementById("telefono").value.trim()
    };
    window.selectedClient= cliente;
     const select = window.parent.document.getElementById('tipoDoc');
     const input = window.parent.document.getElementById('nombre');
  if (select) {
    const newOption = document.createElement('option');
    newOption.value = cliente.tipoIdentificacion + cliente.numIdentificacion;
    newOption.textContent = cliente.tipoIdentificacion + ' - ' + cliente.numIdentificacion;
    select.appendChild(newOption);
    select.value = newOption.value;  // Seleccionar la opción nueva
    input.value = selectedClient.nombreRazonSocial || "Nombre no disponible";
  } else {
    console.error('No se encontró el select en la ventana padre');
  }
     this.reset();
    parent.postMessage("cerrar-modal-cliente", "*");
    
  });
  
  function cerrarRegistroCliente() {
  parent.postMessage("cerrar-modal-cliente", "*");
}