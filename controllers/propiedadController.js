import { validationResult } from 'express-validator';
import { Precio, Categoria, Propiedad } from '../models/index.js';

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
    datos:{}
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
      datos: req.body,
    });
  }

  //__________creando registro
  console.log(req.body)
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lat,
    lng,
    precio: precioId,  //aqui no es un objeto slo que al hacer destructuring le doy el nombre de "precioId" a esa propiedad destructurada que probiene del body
    categoria
  } = req.body; //esto es el destructurin  

  try {
    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId, //aqui como ya se renombro "precio"  por "precioId" a esa propiedad destructurada que probiene del body, entonces ya la puedo pasar con el nombre, realmente aqui seria precioId: precioId pero como tienen el mismo nombre lo puedo hacer en una solo nombre
      categoriaId: categoria, //esta es la forma 2 en que le puedo pasar la informacion si viene el nombre de la variable diferente dese el front
    });

    
  } catch (error) {
    console.log(error)
    
  }

};
export { admin, crear, guardar };
