import { validationResult } from 'express-validator';
import Precio from '../models/Precio.js';
import Categoria from '../models/Categoria.js';

const admin = (rew, res) => {
  res.render('propiedades/admin', {
    pagina: 'mis propiedades',
    barra: true,
  });
};
//fiormlario para crear propiedad
const crear = async (req, res) => {
  //consultar modelo de precios y categorias
  const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]);

  res.render('propiedades/crear', {
    pagina: 'Crear propiedad',
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
  });
};
const guardar = async (req, res) => {
  //validacion
  let resultado = validationResult(req);
 

  //__________comprobando si el formlario es vacio
  if (!resultado.isEmpty()) {
  console.log('resultado', resultado.isEmpty(), 'lllllll');

    //consultar modelo de precios y categorias
      const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]);

    return res.render('propiedades/crear', {
      pagina: 'Crear propiedad',
      barra: true,
      csrfToken: req.csrfToken(), //para cuando reeenvie otravez con el boton enviar
      categorias,
      precios,
      errores: resultado.array(),
    });
  }
};
export { admin, crear, guardar };
