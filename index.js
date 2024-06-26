//const express = require("express"); //CommonJS modules
import express from 'express'; // ECMAScript modules
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

//importando rutas
//forma1:
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
//forma2: import router from "./routes/usuarioRoutes.js";
import db from './config/db.js';

//crear app-----------------------------
const app = express();
//habilitar lectura de datos de formularios-------
app.use(express.urlencoded({ extended: true }));
//habilitar las cookie parser
app.use(cookieParser());
//habilitar el CSRF
app.use(csurf({ cookie: true }));

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
app.use(express.static('public'));

//routing-----------------------------
app.get('/', (req, res) => {
  res.json({ mensaje: 'hola mundo en expres index principal muestra' });
});
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);

//deinir un puerto y arrancarlo-----------------------------
const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`el servidor esta en ${port}`);
});
