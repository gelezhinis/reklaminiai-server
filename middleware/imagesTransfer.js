const path = require('path');

const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    console.log('FILE', file);
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

module.exports = 
  multer({
    // dest: '../images',
    storage: fileStorage,
    fileFilter: fileFilter,
  }).array('images', 4);
