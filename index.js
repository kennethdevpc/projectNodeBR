//const express = require("express"); //CommonJS modules
import express from 'express'; // ECMAScript modules
//importando rutas
//forma1:
import usuarioRoutes from './routes/usuarioRoutes.js';
//forma2: import router from "./routes/usuarioRoutes.js";
import db from './config/db.js';

//crear app-----------------------------
const app = express();
//habilitar lectura de datos de formularios-------
app.use(express.urlencoded({ extended: true }));
//conexion a base de datos:-----------------------------
try {
  await db.authenticate();
  await db.sync({ force: false });
  console.log('Connection database kenneth has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//pug-----------------------------
app.set('view engine', 'pug');
app.set('views', './views');

//Carpeta Publica-----------------------------
app.get('/', (req, res) => {
  res.json({ mensaje: 'hola mundo en expres2 con post' });
});
app.use(express.static('public'));

//routing-----------------------------
app.use('/auth', usuarioRoutes);

//deinir un puerto y arrancarlo-----------------------------
const port = 3300;

app.listen(port, () => {
  console.log(`el servidor esta en ${port}`);
});
