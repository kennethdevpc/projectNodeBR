// import {exit} from 'node:process' //forma 2 de uso de exit
import categorias from "./categorias.js"; //puedo importarlo con un nombre cualqueira ya que es un export default
import Categoria from '../models/Categoria.js';
import db from "../config/db.js";
import precios from "./precios.js";
import Precio from "../models/Precio.js";

const importarDatos = async () => {
  try {
    //autenticar
    await db.authenticate()

    //Generar las columbas
    await db.sync()

    //Insertamos los datos
    await Categoria.bulkCreate(categorias)  //le paso al modelo esas categorias creadas en el arreglo de objeto 
    await Precio.bulkCreate(precios)  //le paso al modelo esas categorias creadas en el arreglo de objeto 
    console.log("Datos Importados correctamente")
    
  } catch (error) {
    console.log(error);
    process.exit(1); //termina el proceso inmediatamente
    // exit(1); //forma 2 de uso de exit
  }
}
/*
process: es un proceso intero de node
argv: es algo inerno de node. //ver pasos2024 35.3.2
 */

if (process.argv[2] === "-i") {   
  importarDatos();

}