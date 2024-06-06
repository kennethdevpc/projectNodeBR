import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
const Usuario = db.define(
  'usuarios',
  {
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
  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10); // rondas de hasheo entre mas grade mas grande pero no es buenocolocar muy grande
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
    scopes: {
      eliminarPassword: {
        attributes: {
          exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt'],
        },
      },
    },
  }
);
//Metodos Personalizados

Usuario.prototype.verificarPassword = function (password) {
  //_______________________password digitada en controlador,password o instancia de la base de datos
  return bcrypt.compareSync(password, this.password);
};

export default Usuario;
