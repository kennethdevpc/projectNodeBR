import express from 'express';
import { body } from 'express-validator'
import { admin, crear, guardar } from '../controllers/propiedadController.js';
import protegerRuta from '../middelware/protegerRuta.js';

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin);
router.get('/propiedades/crear',protegerRuta, crear);
router.post(
  '/propiedades/crear',protegerRuta,
  body('titulo').notEmpty().withMessage('Tittulo no puede ir vacio'),
  body('descripcion')
    .notEmpty()
    .withMessage('Descripcion no puede ir vacio')
    .isLength({ max: 50 })
    .withMessage('La descripcion es muy larga'),
  body('categoria').isNumeric().withMessage('selecciona una categoria'),
  body('precio').isNumeric().withMessage('selecciona un rango de precios'),
  body('habitaciones').isNumeric().withMessage('selecciona una cantidad de Habitaciones'),
  body('estacionamiento').isNumeric().withMessage('selecciona una cantidad de Estacionamientos'),
  body('wc').isNumeric().withMessage('selecciona un rango una cantidad de Baños'),
  body('lat').notEmpty().withMessage('selecciona la propiedad en el mapa'),
  body('lng').notEmpty().withMessage('selecciona la propiedad en el mapa'),

  guardar
);

export default router;
