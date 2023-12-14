const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getCatalog);
router.get('/produktas/:productId', productsController.getSingleProduct);

router.get('/:category', productsController.getProductsByCategory);
router.get('/:category/:subcategory', productsController.getProductsBySubcategory);

module.exports = router;