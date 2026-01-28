# TACO GOD - Sistema de Reservas
## Instrucciones de Configuración Completa

### 📋 RESUMEN
Sistema web de reservas para Taco God con integración a Google Sheets. Incluye:
- Página web responsive y minimalista
- Formulario de reservas con validaciones
- Integración automática con Google Sheets
- Notificaciones por email (opcional)
- Botón flotante de WhatsApp

---

## 🚀 CONFIGURACIÓN PASO A PASO

### PASO 1: Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Renómbrala como "Taco God - Reservas"
4. Renombra la primera pestaña como "Reservas"
5. Copia el ID del Google Sheet de la URL
   - Ejemplo: En `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - El ID es: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### PASO 2: Configurar Google Apps Script
1. Ve a [Google Apps Script](https://script.google.com)
2. Haz clic en "Nuevo proyecto"
3. Reemplaza el código por defecto con el contenido del archivo `google-apps-script-reservas.js`
4. **IMPORTANTE**: Reemplaza `TU_GOOGLE_SHEET_ID_AQUI` con tu ID real del Google Sheet
5. Guarda el proyecto con el nombre "Taco God Reservas API"

### PASO 3: Desplegar Web App
1. En Google Apps Script, haz clic en "Desplegar" > "Nueva implementación"
2. Selecciona tipo: "Aplicación web"
3. Configuración:
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: "Todos"
4. Haz clic en "Desplegar"
5. **Copia la URL** de la aplicación web que aparece
6. En el archivo HTML, reemplaza `YOUR_SCRIPT_ID` con la URL completa

### PASO 4: Configurar archivo HTML
1. Abre el archivo `taco-god-reservas.html`
2. Busca la línea que dice: `const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';`
3. Reemplaza `YOUR_SCRIPT_ID` con la URL completa de tu Web App
4. **Opcional**: Actualiza el número de WhatsApp en los enlaces (busca `541234567890`)

### PASO 5: Subir página web
1. Sube el archivo `taco-god-reservas.html` a tu servidor web o hosting
2. Asegúrate de que sea accesible desde la URL deseada

---

## 🔧 PERSONALIZACIÓN

### Cambiar número de WhatsApp:
Busca y reemplaza `541234567890` en el HTML con el número real.

### Modificar horarios:
Edita la sección "schedule-grid" en el HTML para cambiar los horarios de atención.

### Agregar/quitar horarios de reserva:
Modifica las opciones en el select con id="time" en el formulario.

### Cambiar colores del branding:
Modifica las variables CSS en la sección `:root`:
- `--primary-orange`: Color principal naranja
- `--secondary-orange`: Color secundario naranja
- `--dark-bg`: Color de fondo oscuro
- etc.

---

## 📊 GESTIÓN DE RESERVAS

### En Google Sheets podrás:
- Ver todas las reservas en tiempo real
- Cambiar el estado de las reservas (Pendiente/Confirmada/Cancelada)
- Filtrar por fecha, estado, etc.
- Exportar datos para análisis

### Estados de reserva:
- **Pendiente**: Reserva recién recibida
- **Confirmada**: Reserva confirmada por el restaurante
- **Cancelada**: Reserva cancelada

---

## 📱 FUNCIONALIDADES

### Página Web:
✅ **Responsive design** - Se adapta a móviles y tablets
✅ **Botón de reserva prominente** - Llama la atención del usuario
✅ **Horarios de atención** - Información clara y visible
✅ **Mapa integrado** - Ubicación exacta del restaurante
✅ **Enlaces a redes sociales** - Instagram y WhatsApp
✅ **Diseño minimalista** - Profesional y clean

### Formulario de Reservas:
✅ **Validación de campos** - Previene errores
✅ **Selección de fecha** - No permite fechas pasadas
✅ **Horarios disponibles** - Dropdown con horarios específicos
✅ **Número de personas** - Hasta 6+ personas
✅ **Comentarios opcionales** - Para alergias, ocasiones especiales
✅ **Confirmación visual** - Mensaje de éxito

### Integración Google Sheets:
✅ **Guardado automático** - Todas las reservas se guardan
✅ **Timestamp automático** - Fecha y hora de la reserva
✅ **Formateo profesional** - Headers y colores corporativos
✅ **Auto-resize** - Columnas se ajustan automáticamente

---

## 🔒 SEGURIDAD Y PRIVACIDAD

- El sistema usa Google Apps Script con modo 'no-cors' para seguridad
- No se almacenan datos sensibles en el navegador
- Google Sheets está protegido por tu cuenta de Google
- Las reservas son privadas y solo accesibles por ti

---

## 📞 SOPORTE Y MANTENIMIENTO

### Para modificar el diseño:
- Edita el CSS en el archivo HTML
- Los colores están centralizados en variables CSS
- Las animaciones son opcionales y se pueden desactivar

### Para agregar funcionalidades:
- Notificaciones por email: Descomenta y configura la función `sendNotificationEmail`
- Dashboard de estadísticas: Usa la función `getReservationStats`
- Integración con más plataformas: El sistema es extensible

### Troubleshooting común:
1. **Las reservas no llegan**: Verifica que la URL del Web App esté correcta
2. **Error de permisos**: Asegúrate de que el Web App tenga acceso "Todos"
3. **Google Sheet no se actualiza**: Verifica que el SHEET_ID sea correcto

---

## 🎨 CARACTERÍSTICAS DEL DISEÑO

- **Tipografía**: Oswald (headings) + Inter (body)
- **Paleta de colores**: Naranja (#FF8C42) como principal, fondos oscuros y claros
- **Animaciones**: Tacos flotantes, pulse en botones, fade-in en scroll
- **Elementos visuales**: Iconos SVG de tacos, gradientes, sombras suaves
- **Branding mexicano**: Elementos decorativos sutiles, colores cálidos

El diseño es completamente personalizable y mantiene una estética profesional y moderna.

---

*Desarrollado por CUSIG para Taco God Buenos Aires*