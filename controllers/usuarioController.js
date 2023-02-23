import Usuario from '../models/Usuario.js';
import { check, validationResult } from 'express-validator';
import { generarId } from '../helpers/token.js';
import { emailRegistro } from '../helpers/email.js';
const formularioLogin = (req, res) => {
  //req: lo que le mando al servidor de node
  //res: lo que responde el servidor de node
  res.render('auth/login', {
    pagina: 'inicion Sesión',
  });
};

const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'crear cuenta',
  });
};

const registrar = async (req, res) => {
  await check('nombre').notEmpty().withMessage('Nombre no puede ir vacio ').run(req);
  await check('email').isEmail().withMessage('Debe colocar un email valido ').run(req);
  await check('password').isLength({ min: 6 }).withMessage('password corta ').run(req);
  await check('repetir_password').equals(req.body.password).withMessage('password diferente?').run(req);
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render('auth/registro', {
      pagina: 'crear cuenta',
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const { nombre, email, password } = req.body;
  const existeUsuario = await Usuario.findOne({ where: { email } });

  if (existeUsuario) {
    return res.render('auth/registro', {
      pagina: 'crear cuenta',
      errores: [{ msg: 'El usuario esta registrado' }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  //return;

  //-----------almacenar usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });
  //res.json(usuario);
  // res.json({ mensaje: "se hizo post", data: req.data });

  //------------envio de email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //------------Mostrar mensaje de confirmacion
  res.render('templates/mensaje', {
    pagina: 'Cuenta creada correctamente',
    mensaje: 'hemos enviado un Email de confirmacion, presione el enlace',
  });
};

//funcion que comprueba cuenta
const confirmar = async (req, res, next) => {
  const { token } = req.params;

  //-----verificar si token es valido
  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Error al confirmar cuenta',
      mensaje: 'Hubo un error al confirmar cuenta,token no valido',
      error: true,
    });
  }
  //-----confirmar la cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();
  return res.render('auth/confirmar-cuenta', {
    pagina: 'Error al confirmar cuenta',
    mensaje: 'Inicia seccion se ha confirmado token',
    error: false,
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recuperacion de acceso a bienes raices',
  });
};

export { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword };
