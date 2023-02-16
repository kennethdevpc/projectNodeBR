import Usuario from "../models/Usuario.js";
const formularioLogin = (req, res) => {
  //req: lo que le mando al servidor de node
  //res: lo que responde el servidor de node
  res.render("auth/login", {
    pagina: "inicion Sesión",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "crear cuenta",
  });
};
const registrar = async (req, res) => {
  const usuario = await Usuario.create(req.body);

  res.json(usuario);

  // res.json({ mensaje: "se hizo post", data: req.data });
};
const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recuperacion de acceso a bienes raices",
  });
};

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
};
