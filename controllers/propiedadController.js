const admin = (rew, res) => {
  res.render('propiedades/admin', {
    pagina: 'mis propiedades',
    barra: true,
  });
};
//fiormlario para crear propiedad
const crear = (rew, res) => {
  res.render('propiedades/crear', {
    pagina: 'Crear propiedad',
    barra: true,
  });
};
export { admin, crear };
