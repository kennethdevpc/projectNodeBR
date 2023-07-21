import express from 'express';
import {
  autenticar,
  comprobarToken,
  confirmar,
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
  nuevoPassword,
  registrar,
  resetPassword,
} from '../controllers/usuarioController.js';

const router = express.Router();

//routing
router.get('/login', formularioLogin);
router.post('/login', autenticar);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmar);
router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);
//almacenar nuevo password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

router.get('/', (req, res) => {
  res.json({ mensaje: 'hola mundo en expres2 con post' });
});

export default router;
