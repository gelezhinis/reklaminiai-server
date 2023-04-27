require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const adminRoutes = require('./routes/admin');
const catalogRoutes = require('./routes/catalog');
const authRoute = require('./routes/auth');
const errorController = require('./controllers/error');
const rootDir = require('./utils/path');
const sequelize = require('./utils/database');
const User = require('./models/user');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  // origin: ['https://www.reklaminiai.lt', 'https://reklaminiai.lt', 'https://api.reklaminiai.lt'],
  //default: 'https://www.reklaminiai.lt'

}));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // console.log('FILE', file);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use(bodyParser.json());
app.use(
  multer({
    // dest: 'images',
    storage: fileStorage,
    fileFilter: fileFilter,
  }).array('images', 4)
);


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader(
  //   'Access-Control-Allow-Origin',
  //   'Origin, Content-Type, Accept, Authorization'
  // );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});


app.use(express.static(path.join(rootDir, '/public')));
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(
  session({
    secret: 'super secret long string value',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((admin) => {
//       req.admin = admin;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use('/produktai', catalogRoutes);
app.use(authRoute);

// app.get('/err500', errorController.get500);
// app.use(errorController.get404);

// app.use((error, req, res, next) => {
//   res.status(500).render('500', {
//     pageTitle: 'Error',
//     path: req.path,
//     isAuthenticated: req.session.isLoggedIn
//   });
// });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      bcrypt
        .hash(process.env.ADMIN_PASSWORD, 12)
        .then((hashedPassword) => {
          const token = process.env.ADMIN_TOKEN;
          // try {
          //   token = jwt.sign({userId: 1}, process.env.JWT_SECRET, {expiresIn: '24h'});
          // } catch(err) {
          //   console.log(err.message);
          // }
          return User.create({
            name: 'Karolis',
            email: 'balciui@gmail.com',
            password: hashedPassword,
            token: token
          });
        })
        .catch((err) => console.log(err));
    }
    return user;
  })
  .then((admin) => {
    app.listen(5000, () => console.log('Server is listening on port 5000.'));
  })
  .catch((err) => {
    console.log(err);
  });
