import path from 'path'
export default {
  mode: 'development',

  entry: {
    mapa: './src/js/mapa.js',
    agregarImagen: './src/js/agregarimagen.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js'),
  },
  node: {
    __dirname: true, // o false, dependiendo de tus necesidades
    __filename: true, // o false, dependiendo de tus necesidades
    global: true,
  },
};