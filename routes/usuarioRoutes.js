import express from 'express';
import {
  confirmar,
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
  registrar,
} from '../controllers/usuarioController.js';

const router = express.Router();

//routing
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmar);
router.get('/olvide-password', formularioOlvidePassword);

router.get('/', (req, res) => {
  res.json({ mensaje: 'hola mundo en expres2 con post' });
});

export default router;
