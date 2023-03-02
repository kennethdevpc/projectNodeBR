const admin = (rew, res) => {
  res.render('propiedades/admin', {
    pagina: 'mis propiedades',
    barra: true,
  });
  res.send('Mis propiedades');
};
export { admin };
