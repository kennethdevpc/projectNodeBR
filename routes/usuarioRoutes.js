import express from "express";
const router = express.Router();

//routing
router.get("/login", (req, res) => {
  //req: lo que le mando al servidor de node
  //res: lo que responde el servidor de node
  res.render("auth/login", {
    autenticado: false,
  });
});
router.post("/", (req, res) => {
  res.json({ mensaje: "hola mundo en expres2 con post" });
});

export default router;
