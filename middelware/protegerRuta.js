
import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";
const protegerRuta = async (req, res, next) => {
  //comprobar si hay un token 
  const { _token } = req.cookies;
  if (!_token) {
    return res.redirect('/auth/login')  //lo direcciona a la ventana inicio de secion

  }
  //comprobar el token si es valido 
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET) //obtengo o verifico si existe ese token valido que no haya expirado
    const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id); //encuentro el usuario que se logueo
    // almacenar ese usuario al req
    if (usuario) {
      req.usuario= usuario
      
    } else {
      return res.redirect('auth/login')
    }
    return next();

    
  } catch (error) {
    return res.clearCookie('_token').redirect('/auth/login')  //elimina el token que enga y redirecciona al login 
    
  }
  

  

}

export default protegerRuta; 


