// import {exit} from 'node:process' //forma 2 de uso de exit
import categorias from "./categorias"; //puedo importarlo con un nombre cualqueira ya que es un export default
import Categoria from "../models/Categoria";
import db from "../config/db";

const importarDatos = async () => {
  try {
    //autenticar
    await db.authenticate()

    //Generar las columbas
    await db.sync()

    //Insertamos los datos
    await Categoria.bulkCreate(categorias)  //le paso al modelo esas categorias creadas en el arreglo de objeto 
    console.log("Datos Importados correctamente")
    
  } catch (error) {
    console.log(error);
    process.exit(1); //termina el proceso inmediatamente
    // exit(1); //forma 2 de uso de exit
  }
}