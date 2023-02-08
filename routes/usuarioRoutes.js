import express from "express";
import {
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
} from "../controllers/usuarioController.js";

const router = express.Router();

//routing
router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/olvide-password", formularioOlvidePassword);

router.post("/", (req, res) => {
  res.json({ mensaje: "hola mundo en expres2 con post" });
});

export default router;
