import { DataTypes } from "sequelize";
import db from "../config/db.js";
const Usuario = db.define("usuarios", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: DataTypes.STRING,
  confirmado: DataTypes.BOOLEAN,
});
export default Usuario;
