const formularioLogin = (req, res) => {
  //req: lo que le mando al servidor de node
  //res: lo que responde el servidor de node
  res.render("auth/login", {
    autenticado: false,
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "crear cuenta",
  });
};

export { formularioLogin, formularioRegistro };
