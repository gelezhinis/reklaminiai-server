const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/user-data/:userId', authController.getUserData);

router.post('/admin-login', authController.postAdminLogin);
router.post(
  '/user-signup',
  [
    body('email', 'Klaidingai įvestas el. paštas').isEmail(),
    body('password', 'Slaptažodį turi sudaryti bent 6 simboliai').isLength({
      min: 6,
    }),
  ],
  authController.postUserSignUp
);
router.post('/user-login', authController.postUserLogin);
router.post('/logout', authController.postLogout);
router.get('/activate/user/:id', authController.postActivateUser);

router.get('/password-reset/:email', authController.postPasswordReset);
router.post(
  '/change-password',
  [
    body('password', 'Slaptažodį turi sudaryti bent 6 simboliai').isLength({
      min: 6,
    }),
  ],
  authController.postChangeUserPass
);

module.exports = router;
