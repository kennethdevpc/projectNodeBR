//const express = require("express"); //CommonJS modules
import express from "express"; // ECMAScript modules
//importando rutas
//forma1:
import usuarioRoutes from "./routes/usuarioRoutes.js";
//forma2: import router from "./routes/usuarioRoutes.js";

//crear app
const app = express();

//pug
app.set("view engine", "pug");
app.set("views", "./views");

//routing
app.use("/auth", usuarioRoutes);

//Carpeta Publica
app.use(express.static("public"));

//deinir un puerto y arrancarlo
const port = 3200;

app.listen(port, () => {
  console.log(`el servidor esta en ${port}`);
});
