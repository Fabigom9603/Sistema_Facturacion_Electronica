  $(document).ready(function () {
    // Inicializar el datepicker
    $('#fecha').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      todayHighlight: true,
      startDate: new Date()
    });

    // Mostrar el calendario al hacer clic en el icono
    $('#icono-fecha').click(function () {
      $('#fecha').datepicker('show');
    });

    // Mostrar u ocultar fecha según el método de pago
    const grupoFecha = $('#grupo-fecha');
    const labelFecha = $('#labelgrupo-fecha');

    function toggleFechaVencimiento() {
      const metodo = $('#metodoDePago').val();
      if (metodo !== "2") {
        grupoFecha.hide();
        labelFecha.hide();
      } else {
        grupoFecha.show();
        labelFecha.show();
      }
    }

    // Ejecutar al cargar
    toggleFechaVencimiento();

    // Ejecutar al cambiar opción
    $('#metodoDePago').on('change', toggleFechaVencimiento);
  });


