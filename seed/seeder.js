// import {exit} from 'node:process' //forma 2 de uso de exit
import categorias from "./categorias.js"; //puedo importarlo con un nombre cualqueira ya que es un export default
import precios from './precios.js';
import { Categoria, Precio } from '../models/index.js'  //esto tiene el modelo y las relciones

import db from "../config/db.js";

const importarDatos = async () => {
  try {
    //autenticar
    await db.authenticate()

    //Generar las columbas
    await db.sync()

    //Insertamos los datos
    const a=  Categoria.bulkCreate(categorias)  //le paso al modelo esas categorias creadas en el arreglo de objeto 
    const b=  Precio.bulkCreate(precios)  //le paso al modelo esas categorias creadas en el arreglo de objeto 
    await Promise.all([a,b])
    console.log("Datos Importados correctamente")
    
  } catch (error) {
    console.log(error);
    process.exit(1); //termina el proceso inmediatamente
    // exit(1); //forma 2 de uso de exit
  }
}

const eliminarDatos = async () => {
  try {
    // await Promise.all([
    //   Categoria.destroy({ where: {}, truncate: true }),
    //   Precio.destroy({ where: {}, truncate: true }),
    // ]);

    // Forma2 de eliminar datos de la base de datos
    await db.sync({ force: true });

    console.log('Datos eliinados correctamente');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
    
  }
}


/*
process: es un proceso intero de node
argv: es algo inerno de node. //ver pasos2024 35.3.2
 */

if (process.argv[2] === "-i") {   
  importarDatos();

}
if (process.argv[2] === "-e") {   
  eliminarDatos();

}

