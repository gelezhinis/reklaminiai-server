require('dotenv').config();
const nodemailer = require('nodemailer');

exports.sendConfirmationEmail = ({toUser, hash}) => {
  
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    });

    console.log('URL', process.env.DOMAIN);

    const message = {
      from: process.env.NODEMAILER_USER,
      to: toUser.email,
      subject: 'Activate Account',
      html: `
        <h3>Sveiki, ${toUser.name}</h3>
        <p>Malonu kad užsiregistravote pas mus.</p>
        <p>Patvirtinkite savo registraciją paspausdami šią nuorodą: <a target="_" href="${process.env.DOMAIN}/activate/user/${hash}">Aktyvacijos nuoroda</a> ir galėsite prisijungti.</p>
        <p>Nuoširdžiai Jūsų, Reklaminiai.lt komanda</p>
      `
    }

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log('ERROR', err.message);
        reject(err);
      } else {
        resolve(info);
      }
    })
  });
}


exports.sendResetPassEmail = ({toUser, id, token}) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    });

    const message = {
      from: process.env.NODEMAILER_USER,
      to: toUser.email,
      subject: 'Slaptažodžio atnaujinimas',
      html: `
        <h3>Sveiki, ${toUser.name}</h3>
        <p>Norėdami nustatyti naują slaptažodį</p>
        <p>paspauskite šią nuorodą: <a target="_" href="${process.env.DMN}/password-reset/${id}/${token}">Reset password</a></p>
        <p>Nuoširdžiai Jūsų, Reklaminiai.lt komanda</p>
      `
    }

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log('ERROR', err.message);
        reject(err);
      } else {
        resolve(info);
      }
    })
  });
}
