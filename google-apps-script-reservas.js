// Google Apps Script para manejar las reservas de Taco God
// Instrucciones de configuración:

/*
1. Ve a https://script.google.com/
2. Crea un nuevo proyecto
3. Reemplaza el código por defecto con este código
4. Configura el ID de tu Google Sheet en la variable SHEET_ID
5. Despliega como Web App con acceso "Anyone"
6. Copia la URL del Web App y reemplázala en el archivo HTML

CONFIGURACIÓN DEL GOOGLE SHEET:
- Crea una nueva hoja de cálculo en Google Sheets
- Renombra la primera hoja como "Reservas"
- En la primera fila (encabezados) añade:
  A1: Timestamp, B1: Nombre, C1: Teléfono, D1: Email, E1: Fecha, F1: Hora, G1: Personas, H1: Comentarios, I1: Estado
*/

// CONFIGURACIÓN - Reemplaza con el ID de tu Google Sheet
const SHEET_ID = 'TU_GOOGLE_SHEET_ID_AQUI'; // Ejemplo: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
const SHEET_NAME = 'Reservas';

function doPost(e) {
  try {
    // Parsear los datos enviados desde el formulario
    const data = JSON.parse(e.postData.contents);
    
    // Abrir la hoja de cálculo
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Si es la primera vez, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 9).setValues([[
        'Timestamp', 'Nombre', 'Teléfono', 'Email', 'Fecha', 'Hora', 'Personas', 'Comentarios', 'Estado'
      ]]);
      
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground('#FF8C42');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
    }
    
    // Preparar los datos para insertar
    const rowData = [
      data.timestamp || new Date().toLocaleString('es-AR'),
      data.name,
      data.phone,
      data.email,
      data.date,
      data.time,
      data.people,
      data.comments,
      'Pendiente' // Estado inicial
    ];
    
    // Insertar nueva fila
    sheet.appendRow(rowData);
    
    // Formatear la nueva fila (opcional)
    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(lastRow, 1, 1, 9);
    range.setBorder(true, true, true, true, false, false);
    
    // Colorear filas alternas
    if (lastRow % 2 === 0) {
      range.setBackground('#f8f9fa');
    }
    
    // Auto-ajustar columnas
    sheet.autoResizeColumns(1, 9);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Reserva registrada correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error al procesar la reserva: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Taco God Reservations API está funcionando'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Función opcional: Enviar notificación por email cuando llega una nueva reserva
function sendNotificationEmail(reservationData) {
  const subject = `Nueva Reserva - Taco God - ${reservationData.date} ${reservationData.time}`;
  const body = `
    ¡Nueva reserva recibida!
    
    Detalles de la reserva:
    • Nombre: ${reservationData.name}
    • Teléfono: ${reservationData.phone}
    • Email: ${reservationData.email}
    • Fecha: ${reservationData.date}
    • Hora: ${reservationData.time}
    • Personas: ${reservationData.people}
    • Comentarios: ${reservationData.comments}
    • Timestamp: ${reservationData.timestamp}
    
    Ve a tu Google Sheet para gestionar esta reserva:
    https://docs.google.com/spreadsheets/d/${SHEET_ID}
  `;
  
  // Reemplaza con el email donde quieres recibir notificaciones
  const emailDestino = 'tu-email@ejemplo.com';
  
  try {
    MailApp.sendEmail(emailDestino, subject, body);
  } catch (error) {
    console.error('Error enviando email de notificación:', error);
  }
}

// Función para configurar automáticamente la hoja de cálculo
function setupSheet() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Agregar encabezados
    sheet.getRange(1, 1, 1, 9).setValues([[
      'Timestamp', 'Nombre', 'Teléfono', 'Email', 'Fecha', 'Hora', 'Personas', 'Comentarios', 'Estado'
    ]]);
    
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, 9);
    headerRange.setBackground('#FF8C42');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    
    // Auto-ajustar columnas
    sheet.autoResizeColumns(1, 9);
    
    // Congelar fila de encabezados
    sheet.setFrozenRows(1);
    
    console.log('Hoja configurada correctamente');
    
  } catch (error) {
    console.error('Error configurando la hoja:', error);
  }
}

// Función para obtener estadísticas de reservas (opcional)
function getReservationStats() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { totalReservas: 0, pendientes: 0, confirmadas: 0 };
    }
    
    const reservas = data.slice(1); // Excluir encabezados
    const totalReservas = reservas.length;
    const pendientes = reservas.filter(row => row[8] === 'Pendiente').length;
    const confirmadas = reservas.filter(row => row[8] === 'Confirmada').length;
    
    return {
      totalReservas,
      pendientes,
      confirmadas,
      canceladas: reservas.filter(row => row[8] === 'Cancelada').length
    };
    
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return { error: error.toString() };
  }
}