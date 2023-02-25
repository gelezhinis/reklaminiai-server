const express = require('express');
const {body} = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');
const imagesTransfer = require('../middleware/imagesTransfer');

const router = express.Router();

// router.get('/add-product', isAuth, adminController.getAddProduct);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/add-product', [
  body('category')
    .isString()
    .isLength({min: 3})
    .trim()
    .withMessage('Nepasirinkote kategorijos'),
  body('subcategory')
    .trim(),
  body('title')
    .isString()
    .isLength({min: 3})
    .trim()
    .withMessage('Netinkamas produkto pavadinimas'),
  body('price1')
    .isString()
    .isLength({min: 5})
    .trim()
    .withMessage('Įrašyk pirmą kainą'),
  body('description')
    .trim()
], 
isAuth, 
// imagesTransfer,
adminController.postAddProduct);
router.patch('/edit-product', [
  body('category')
    .isString()
    .isLength({min: 3})
    .trim()
    .withMessage('Nepasirinkote kategorijos'),
  body('title')
    .isString()
    .isLength({min: 3})
    .trim()
    .withMessage('Netinkamas produkto pavadinimas'),
  body('price1')
    .isString()
    .isLength({min: 5})
    .trim()
    .withMessage('Įrašyk pirmą kainą'),
  body('description')
    .trim()
], isAuth, adminController.postEditProduct);
router.delete(
  '/delete-product/:productId', isAuth, adminController.postDeleteProduct);

module.exports = router;
