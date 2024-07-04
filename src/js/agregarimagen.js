import { Dropzone } from 'dropzone'
import { header } from 'express-validator';
const token =  document.querySelector('meta[name="csrf-token"]').getAttribute('content');
Dropzone.options.imagen = {
  dictDefaultMessage: 'Sube tus imagenes aqui', //mensaje en el box
  acceptedFiles: '.png, .jpg, .jpeg', //para determinar el tipo de archivo
  maxFilesize: 5, //tamaño de el archivo maximo permitido
  maxFiles: 1, //cantidad de archivos que permite cargar
  parallelUploads: 1, //debe ser los mismos que maxfiles
  autoProcessQueue: false, //es el enable para subir, s esta en false ahasta que no lo ponga en tru no se sube 
  addRemoveLinks: true, //habilita enlace para eliminar el archivo si ya se subi
  dictRemoveFile: 'Borrar archivo', //cambia el texto de eliminar archivo
  dictMaxFilesExceeded:'El limite es 1 archivo ',//cambia el texto del mensaje de error cuando no se pueden subir mas archivos
  headers: {
    'CSRF-Token':token

  },
  paramName: 'imagen'  //tiene que tener el mismo nombre de loq ue se esta uzando en la ruta
  
}