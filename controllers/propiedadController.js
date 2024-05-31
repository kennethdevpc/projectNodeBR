import Precio from '../models/Precio.js'
import Categoria from '../models/Categoria.js'
const admin = (rew, res) => {
  res.render('propiedades/admin', {
    pagina: 'mis propiedades',
    barra: true,
  });
};
//fiormlario para crear propiedad
const crear = async (req, res) => {

  //consultar modelo de precios y categorias
  const [categorias, precios] =  await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
    
  ])
  
  res.render('propiedades/crear', {
    pagina: 'Crear propiedad',
    barra: true,
    categorias,
    precios
  });
};
export { admin, crear };
