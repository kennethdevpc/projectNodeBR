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
const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recuperacion de acceso a bienes raices",
  });
};

export { formularioLogin, formularioRegistro, formularioOlvidePassword };
