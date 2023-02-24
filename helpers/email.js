import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;
  //enviar email

  // send mail with defined transport object
  let info = await transport.sendMail({
    from: '"Fred Foo 👻" <BienesRaices.com>', // sender address
    to: email, // list of receivers
    subject: 'Confirmacion cuenta en bienes raices ✔', // Subject line
    text: 'Confirmacion cuenta en bienes raices ✔', // plain text body
    html: `<div>
            <p>hola ${nombre}, confirma la cuenta </p>
            <p>Tu cuenta ya esta lista , da click en el siguiente enlace 
            <a href="${process.env.BACKEND_URL}:${
      process.env.PORT || 3300
    }/auth/confirmar/${token}">Confirmacion de cuenta </a> </p>
            <p>SI desconoces este procedimiento ignora el mensaje</p>
           </div > `, // html body
  });
};

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;
  //enviar email

  // send mail with defined transport object
  let info = await transport.sendMail({
    from: '"Fred Foo 👻" <BienesRaices.com>', // sender address
    to: email, // list of receivers
    subject: 'Restablece contraseña en bienes raices ✔', // Subject line
    text: 'Restablece contraseña en bienes raices ✔', // plain text body
    html: `<div>
            <p>hola ${nombre}, Has solicitado restablecer tu password </p>
            <p>Click en el siguiente enlace para generar nueva contraseña
            <a href="${process.env.BACKEND_URL}:${
      process.env.PORT || 3300
    }/auth/olvide-password/${token}">Reestablecer password </a> </p>
            <p>SI desconoces este procedimiento ignora el mensaje</p>
           </div > `, // html body
  });
};

export { emailRegistro, emailOlvidePassword };
