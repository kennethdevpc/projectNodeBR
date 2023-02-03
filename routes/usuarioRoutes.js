import express from "express";
const router = express.Router();

//routing
router.get("/", (req, res) => {
  //req: lo que le mando al servidor de node
  //res: lo que responde el servidor de node
  res.send("hola mundo en expres");
});
router.post("/", (req, res) => {
  res.json({ mensaje: "hola mundo en expres2 con post" });
});

router
  .route("/rutasResumen")
  .get((req, res) => {
    res.send("hola desde ruta rutas resumen");
  })
  .post((req, res) => {
    res.json("hola desde ruta rutas resumen post ");
  });

export default router;
