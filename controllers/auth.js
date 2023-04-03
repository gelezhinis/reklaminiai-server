require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const sequelize = require('../utils/database');
const User = require('../models/user');
const { sendConfirmationEmail, sendResetPassEmail } = require('../mailer');

exports.getUserData = (req, res, next) => {
  const uid = req.params.userId;
  User.findOne({ where: { id: uid } })
    .then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ message: 'Toks vartotojas neregistruotas.' });
      }
      return res
        .status(200)
        .json({ message: 'OK', userId: user.id, pass: user.password });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err.message });
    });
};

exports.postAdminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } }).then((admin) => {
    if (!admin) {
      req.flash('error', 'Chujovai įvestas elektrinis paštas');
      return res.redirect('/admin-login-karolis');
    }
    return bcrypt
      .compare(password, admin.password)
      .then((doMatch) => {
        if (doMatch) {
          // const currentTime = new Date().getTime();
          // req.session.isLoggedIn = true;
          // req.session.isAdmin = true;

          // req.session.cookie._expires = currentTime;
          // req.session.cookie.authenticated = true;
          // console.log('Seshinas', req.session);
          return res.status(200).json({ message: 'OK', token: admin.token });
        }
        req.flash('error', 'Chujovai įvestas slaptažodis');
        // res.redirect('/admin-login-karolis');
        res.status(422).json({ message: req.flash('error') });
      })
      .catch((err) => {
        console.log('Authentication Error');
        console.log(err);
        res.status(404).json({ message: err.message });
      });
  });
};

exports.postUserSignUp = async (req, res, next) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('ERRORS', errors.array());
    let errArr = [];
    errors.array().map((err) => errArr.push(err.msg));
    // const inputErrors = errArr.join('\n');
    return res.status(422).json({ message: errArr });
  }

  sequelize
    .sync()
    .then((result) => {
      return User.findOne({ where: { email: userEmail } });
    })
    .then((user) => {
      if (user) {
        throw new Error('Toks vartotojas jau registruotas.');
      }
      let userToken;
      bcrypt
        .hash(userPassword, 12)
        .then((hashedPassword) => {
          // try {
          //   userToken = jwt.sign(
          //     { userEmail: userEmail },
          //     'supersecret_key',
          //     { expiresIn: '7d' }
          //   );
          // } catch (err) {
          //   console.log(err.message);
          // }
          return User.create({
            name: userName,
            email: userEmail,
            password: hashedPassword,
            // token: userToken,
          });
        })
        .then((user) => {
          sendConfirmationEmail({
            toUser: user.dataValues,
            hash: user.dataValues.id,
          });
          return res.status(201).json({
            message:
              'Kad užbaigtumėte registraciją, paspauskite nuorodą, kurią rasite elektroniniame pašte.',
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err.message);
      res.status(422).json({ message: err.message });
    });
};

exports.postUserLogin = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  User.findOne({ where: { email: userEmail } }).then((user) => {
    if (!user) {
      req.flash(
        'error',
        'Neteisingai įvestas elektroninis paštas arba slaptažodis'
      );
      return res.redirect('/authenticate');
    }
    if (!user.token) {
      return res.status(403).json({
        message:
          'Norėdami prisijungti, aktyvuokite paskyrą paspausdami nuorodą, kurią išsiuntėme elektroniniu paštu.',
      });
    }
    return bcrypt
      .compare(userPassword, user.password)
      .then((doMatch) => {
        if (doMatch) {
          const currentTime = new Date().getTime();
          req.session.isLoggedIn = true;

          // req.session.cookie._expires = currentTime;
          // req.session.cookie.authenticated = true;
          console.log('Seshinas', req.session);
          return res.status(200).json({ message: 'OK', token: user.token });
        }
        req.flash('error', 'Neteisingas slaptažodis');
        // res.redirect('/admin-login-karolis');
        res.status(422).json({ message: req.flash('error'), noPass: true });
      })
      .catch((err) => {
        console.log('Authentication Error');
        console.log(err);
        res.status(404).json({ message: err.message });
      });
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.status(201).json({ message: 'Logging out' });
};

exports.postActivateUser = (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: 'Cannot validate user.' });
  } else {
    sequelize
      .sync()
      .then((result) => {
        return User.findOne({ where: { id: userId } });
      })
      .then((user) => {
        // console.log('USER', user);
        let userToken;
        if (!user) {
          throw new Error('Aktyvacija nepavyko.');
        }
        try {
          userToken = jwt.sign({ userEmail: user.email }, 'justsecret_key', {
            expiresIn: '7d',
          });
        } catch (err) {
          console.log(err.message);
        }
        user.token = userToken;
        return user.save();
      })
      .catch((err) => {
        console.log(err.message);
        res.status(422).json({ message: err.message });
      });

    // res.writeHead(302, {Location: 'http://localhost:3000'})
    // res.status(200).json({message: 'User is Activated', userId: userId});
    res.redirect('http://localhost:3000/authenticate');
  }
};

exports.postPasswordReset = (req, res, next) => {
  const email = req.params.email;

  // console.log('EMAIL', email);
  if (!email) {
    return res.status(401).json({ message: 'Cannot validate user.' });
  } else {
    sequelize
      .sync()
      .then((result) => {
        return User.findOne({ where: { email: email } });
      })
      .then((user) => {
        if (!user) {
          throw new Error('Nerandame tokio vartotojo.');
        }
        const secret = process.env.JWT_SECRET + user.password;
        const payload = {
          email: user.email,
          id: user.id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        sendResetPassEmail({
          toUser: user.dataValues,
          id: user.dataValues.id,
          token: token,
        });
        return res.status(201);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(422).json({ message: err.message });
      });
  }
};

exports.postChangeUserPass = (req, res, next) => {
  const { userId, token, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  sequelize
    .sync()
    .then((result) => {
      return User.findOne({ where: { id: userId } });
    })
    .then((user) => {
      if (!user) {
        throw new Error('Toks vartotojas neregistruotas.');
      }
      const secret = process.env.JWT_SECRET + user.password;
      const payload = jwt.verify(token, secret);
      if (payload.id === user.id) {
        bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            user.password = hashedPassword;
            return user.save();
          })
          .catch((err) => console.log(err));
      } 
    })
    .then((result) => {
      return res
        .status(201)
        .json({ message: 'Slaptažodis pekeistas, galite prisijungti.' });
    })
    .catch((err) => {
      // console.log(err.message);
      const message = err.message === 'invalid token' ? 'Slaptažodžio keitimas negalimas. Netinkama nuoroda.' : err.message
      res.status(422).json({ message: message });
    });
};
