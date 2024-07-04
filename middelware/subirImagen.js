import multer from 'multer';
import path from 'path'  //algo interno de node para navegar en carpetas
import {generarId} from '../helpers/token.js'
const storage = multer.diskStorage({
  //file: es el archivo que se esta subiendo
  destination: function (req, file, cb) {
    //error, detination
    cb(null, './public/uploads/'); //si se llama significa que se subio correctamente la imagen
  },
  //es para definir el nombre el cb es un callback propio que se ejcuta cuando se utiliza el multer.diskStorage
  filename: function (req, file, cb) {
    //path.extname(file.originalname)); me retorna solo la extension 
    cb(null, generarId() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }) //aqui cuando se utilice este middelware pero con la configuracion que le estemos pasando "storage"

export default upload