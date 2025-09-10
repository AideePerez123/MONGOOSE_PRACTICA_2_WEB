import express from 'express';
import routes from './routes/index.route.js';
import dotenv from 'dotenv';
import { connectToMongo } from './configs/mongodb.config.js';
import i18n from 'i18n';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18n.configure({
  locales: ['es', 'en'],
  directory: __dirname + '/locales',
  defaultLocale: 'es',
  queryParameter: 'lang',
});
app.use(i18n.init);

app.use(express.json());

app.use('/', routes);

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => console.log(`Servidor iniciado en puerto ${port}`));
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();