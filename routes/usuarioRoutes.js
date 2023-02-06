import express from "express";
import { formularioLogin } from "../controllers/usuarioController.js";

const router = express.Router();

//routing
router.get("/login", formularioLogin);

router.post("/", (req, res) => {
  res.json({ mensaje: "hola mundo en expres2 con post" });
});

export default router;
