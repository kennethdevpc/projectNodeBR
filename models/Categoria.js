import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Categoria = db.define('categorias', {
  // id: {   //no lo agrego ya que por defecto tiene asignacion en orden asc
  //   primaryKey: true,
  // },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  }
});

export default Categoria;
