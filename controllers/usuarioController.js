import Usuario from '../models/Usuario.js';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
// import { Jwt } from 'jsonwebtoken';
import { generarJWT, generarId } from '../helpers/token.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/email.js';
import bcrypt from 'bcrypt';

const formularioLogin = (req, res) => {
  //req: lo que le mando al servidor de node
  //res: lo que responde el servidor de node
  res.render('auth/login', {
    pagina: 'inicion Sesión',
    csrfToken: req.csrfToken(),
  });
};
//------autenticar
const autenticar = async (req, res) => {
  //_____validando campos
  await check('email').isEmail().withMessage('Debe colocar un email valido ').run(req);
  await check('password').notEmpty().withMessage('password Obligatorio ').run(req);

  let resultado = validationResult(req);
  //__________comprobando si el formlario es vacio
  if (!resultado.isEmpty()) {
    return res.render('auth/login', {
      pagina: 'inicion Sesión',
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
    });
  }

  const { email, password } = req.body;
  //_________validando si ususario existe y si esta confirmado:
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.render('auth/login', {
      pagina: 'inicion Sesión',
      errores: [{ msg: 'el ususario no existe' }],
      csrfToken: req.csrfToken(),
    });
  }
  if (!usuario.confirmado) {
    return res.render('auth/login', {
      pagina: 'inicion Sesión',
      errores: [{ msg: 'el ususario no esta confirmado' }],
      csrfToken: req.csrfToken(),
    });
  }

  //______revisar el password

  if (!usuario.verificarPassword(password)) {
    return res.render('auth/login', {
      pagina: 'inicion Sesión',
      errores: [{ msg: 'la contraseña esta incorrecta' }],
      csrfToken: req.csrfToken(),
    });
  }
  //______Autenticar el usuario
  const token = generarJWT(usuario);
  console.log('token________________', token);
  //______Almacenar Cookie
  return res
    .cookie('_token', token, {
      httpOnly: true, //para que el cookie  no sea accesible desde la api de javscript
      secure: true, //si es https
      sameSite: true,
    })
    .redirect('/mis-propiedades');
};

//------get fromulario registro
const formularioRegistro = (req, res) => {
  console.log('Token csrf', req.csrfToken());
  res.render('auth/registro', {
    pagina: 'crear cuenta',
    csrfToken: req.csrfToken(),
  });
};
//------post fromulario registro
const registrar = async (req, res) => {
  await check('nombre').notEmpty().withMessage('Nombre no puede ir vacio ').run(req);
  await check('email').isEmail().withMessage('Debe colocar un email valido ').run(req);
  await check('password').isLength({ min: 6 }).withMessage('password corta ').run(req);
  await check('repetir_password').equals(req.body.password).withMessage('password diferente?').run(req);
  let resultado = validationResult(req);

  //__________comprobando si el formlario es vacio
  if (!resultado.isEmpty()) {
    return res.render('auth/registro', {
      pagina: 'crear cuenta',
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
      csrfToken: req.csrfToken(),
    });
  }

  const { nombre, email, password } = req.body;
  const existeUsuario = await Usuario.findOne({ where: { email } });
  //__________comprobando si el usuario esta reistrado
  if (existeUsuario) {
    return res.render('auth/registro', {
      pagina: 'crear cuenta',
      csrfToken: req.csrfToken(),
      errores: [{ msg: 'El usuario esta registrado' }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //___________almacenar usuario
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
    mensaje: 'hemos enviado un Email con las instrucciones',
  });
};

//funcion que comprueba cuenta
const confirmar = async (req, res, next) => {
  const { token } = req.params;

  //-----verificar si token es valido o usuario regitrado
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
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  await check('email').isEmail().withMessage('Debe colocar un email valido ').run(req);
  let resultado = validationResult(req);

  //__________comprobando si el formlario es vacio
  if (!resultado.isEmpty()) {
    return res.render('auth/olvide-password', {
      pagina: 'Recuperacion de acceso a bienes raices',
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }
  //__________Obtiene un request.body y busca asi el uesuario esxiste
  const { email } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  //__________comprobando si el usuario esta reistrado
  if (!usuario) {
    return res.render('auth/olvide-password', {
      pagina: 'Recuperacion de acceso a bienes raices',
      csrfToken: req.csrfToken(),
      errores: [{ msg: 'El usuario con este email NO esta registrado' }],
    });
  }

  //___________Generar un token y enviar email
  usuario.token = generarId();
  await usuario.save();
  //enviar email
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  //Renserizar mensaje

  //------------Mostrar mensaje de confirmacion
  res.render('templates/mensaje', {
    pagina: 'CEnvio de reestablecimiento de contraseña',
    mensaje: 'hemos enviado un Email de restablecimiento de contraseña',
  });
};

const comprobarToken = async (req, res, next) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ where: { token } });

  //-----verificar si token es valido o usuario regitrado

  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Reestablece tu pasword',
      mensaje: 'Hubo un error al validar informacion,token no valido, intenta de nuevo',
      error: true,
    });
  }
  //-----mostrar formulario para modificar password
  res.render('auth/reset-password', {
    pagina: 'Reestablece tu pasword',
    csrfToken: req.csrfToken(),
    //token: token,//solo para forma 1
  });

  next();
};

const nuevoPassword = async (req, res) => {
  //validar password
  await check('password').isLength({ min: 6 }).withMessage('password corta ').run(req);
  await check('repetir_password').equals(req.body.password).withMessage('password diferente?').run(req);
  let resultado = validationResult(req);
  //__________comprobando si el formlario es vacio
  if (!resultado.isEmpty()) {
    return res.render('auth/reset-password', {
      pagina: 'Reestablece tu pasword',
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  //validar quien hace el cambio
  //puedo leer el token y mirar en la base de datos quien es el usuario a cambiar la contraseña
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ where: { token } });
  //hashear el nuevo password

  const salt = await bcrypt.genSalt(10); // rondas de hasheo entre mas grade mas grande pero no es buenocolocar muy grande
  usuario.password = await bcrypt.hash(password, salt);

  usuario.token = null;
  await usuario.save();

  return res.render('auth/confirmar-cuenta', {
    pagina: 'Password restablecido!',
    mensaje: ' el password se corrigio correctamente ',
  });
};

export {
  formularioLogin,
  autenticar,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};
