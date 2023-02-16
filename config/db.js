import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const db = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS ?? "",
  {
    host: process.env.BD_HOST,
    dialect: "mysql",
    port: 3306,
    define: {
      timestamps: true,
    },
    pool: {
      //como va  a ser el comportamiento para la conexiones nuevas o existentes
      max: 5, //maximo de conexiones
      min: 0,
      acquire: 30000, //30 seg tratando de hacer una conexion para marcar un error de conexion
      idle: 10000, //10 seg si nadie esta usando el proyecto libera la conexion
    },
    operatorsAliases: false, //lo marco en falso para que no utilice los aliaces
  }
);
export default db;
