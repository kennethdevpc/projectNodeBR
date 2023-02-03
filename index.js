//const express = require("express"); //CommonJS modules
import express from "express"; // ECMAScript modules
//importando rutas
//forma1: import usuarioRoutes from "./routes/usuarioRoutes.js";
import router from "./routes/usuarioRoutes.js";

//crear app
const app = express();

//routing
app.use("/", router);

//deinir un puerto y arrancarlo
const port = 3000;

app.listen(port, () => {
  console.log(`el servidor esta en ${port}`);
});
