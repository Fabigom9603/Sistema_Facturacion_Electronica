// Gráfico ejemplo: Ventas por mes
new Chart(document.getElementById("ventasMes"), {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
      datasets: [{
        label: 'Ventas ($)',
        data: [5000, 7000, 4000, 6500, 8000],
        backgroundColor: '#0d6efd'
      }]
    }
  });

  // Gráfico: Facturas por estado
  new Chart(document.getElementById("facturasEstado"), {
    type: 'pie',
    data: {
      labels: ['Emitidas', 'Anuladas', 'Pendientes'],
      datasets: [{
        data: [40, 5, 10],
        backgroundColor: ['#198754', '#dc3545', '#ffc107']
      }]
    }
  });

  // Gráfico: Monto por tipo
  new Chart(document.getElementById("facturaTipo"), {
    type: 'bar',
    data: {
      labels: ['Venta', 'Servicio', 'Exportación'],
      datasets: [{
        label: 'Monto ($)',
        data: [12000, 8500, 3000],
        backgroundColor: ['#0d6efd', '#20c997', '#6f42c1']
      }]
    }
  });