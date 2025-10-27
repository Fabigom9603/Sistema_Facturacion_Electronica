window.addEventListener("message", (event) => {
  // Escuchar el mensaje del iframe para cerrar el modal
  if (event.data?.accion === "cerrarModalTipoDocumento") {
    const modaledicion = bootstrap.Modal.getInstance(document.getElementById("modaledicionTipoDoc"));
    const modalcrear = bootstrap.Modal.getInstance(document.getElementById("modalRegistroTipoDoc"));
    if (modaledicion) {
      modaledicion.hide();
    }
    if (modalcrear ) {
      modalcrear.hide();
    }
  }
   // También puedes recargar el select si el mensaje fue para eso
  if (event.data?.accion === "recargarDocumentos") {
    obtenerDocumentosTransformadosYcargar("tipoDocmodalFW"); // O tu función para recargar el select
  }

 if (event.data?.accion === "deshabilitarBotonesTipoDoc") {
  const select = document.getElementById("tipoDocmodalFW");
  if (select) {
    select.selectedIndex = 0; // vuelve al índice 0 (la opción por defecto)
  }
  if (typeof deshabilitarBotonesTipoDoc === "function") {
  deshabilitarBotonesTipoDoc();
}
}
});