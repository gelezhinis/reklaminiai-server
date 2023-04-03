require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token !== process.env.ADMIN_TOKEN) {
    const error =  new Error('Authentication failed!?!?!');
    next(error);
  }
  next();
}