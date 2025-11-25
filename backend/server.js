// Cargar variables de entorno desde .env
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

// Validar que PORT esté definido
if (!process.env.PORT) {
  console.warn('ADVERTENCIA: PORT no está definido en .env, usando puerto por defecto 3000');
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
