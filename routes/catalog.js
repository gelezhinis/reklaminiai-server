const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// router.get('/', productsController.getCatalog);
// router.get('/rpriemones', productsController.getPenCatalog);
// router.get('/rpriemones/plastikiniai', productsController.getPenPlastic);
// router.get('/rpriemones/plastikiniai/:productId', productsController.getPenProduct);
// router.get('/rpriemones/metaliniai', productsController.getPenMetal);
// router.get('/rpriemones/metaliniai/:productId', productsController.getPenProduct);
// router.get('/rpriemones/eko', productsController.getPenEko);
// router.get('/rpriemones/piestukai', productsController.getPenPencil);
// router.get('/rpriemones/:productId', productsController.getPenProduct);
// router.get('/kiti', productsController.getOtherProducts);
// router.get('/spaudos_darbai', productsController.getPrintCatalog);
// router.get('/spauda/skrajutes', productsController.getPrintFlyers);

router.get('/', productsController.getCatalog);
router.get('/produktas/:productId', productsController.getSingleProduct);

// router.get('/spauda/lankstinukai', productsController.getPrintLeaflets);
// router.get('/puodeliai/keramikiniai', productsController.getMugCeramic);
router.get('/:category', productsController.getProductsByCategory);
router.get('/:category/:subcategory', productsController.getProductsBySubcategory);




// router.get('/puodeliai/termo', productsController.getMugTermic);
// router.get('/rveliavos', productsController.getFlagCatalog);
// router.get('/rveliavos/veliavos', productsController.getFlag);
// router.get('/rveliavos/priedai', productsController.getFlagAccessories);
// router.get('/atsvaitai', productsController.getReflectorCatalog);
// router.get('/atsvaitai/juosteles', productsController.getReflectorStrip);
// router.get('/atsvaitai/patsvaitai', productsController.getReflectorHang);
// router.get('/atsvaitai/liemenes', productsController.getReflectorVest);
// router.get('/produktas/:productId', productsController.getSingleProduct);

module.exports = router;