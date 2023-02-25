const Product = require('../models/product');

exports.getCatalog = (req, res, next) => {
  Product.findAll()
    .then(products => {
      return res.status(200).json(products);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getSingleProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log('SINGLE_PRODUCT_CONTROLLER')
  Product.findByPk(prodId)
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

// --- Rašymo Priemonių Valdikliai ---

exports.getPenCatalog = (req, res, next) => {
  // res.render('catalog/rpriemones', {
  //   pageTitle: 'Rašymo Priemonės',
  //   path: '/',
  //   isAuthenticated: req.session.isLoggedIn,
  // });
};

exports.getPenPlastic = (req, res, next) => {
  // const path = '/' + req.path.split('/')[1];
  Product.findAll({ where: { subcategory: 'plastikiniai' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Plastikiniai Tušinukai',
      //   prods: products,
      //   path: '/',
      //   urlPath: path,
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getPenMetal = (req, res, next) => {
  const path = '/' + req.path.split('/')[1];
  Product.findAll({ where: { subcategory: 'metaliniai' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Metaliniai Tušinukai',
      //   prods: products,
      //   path: '/',
      //   urlPath: path,
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getPenEko = (req, res, next) => {
  const path = '/' + req.path.split('/')[1];
  Product.findAll({ where: { subcategory: 'eko' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'EKO Tušinukai',
      //   prods: products,
      //   path: '/',
      //   urlPath: path,
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getPenPencil = (req, res, next) => {
  const path = '/' + req.path.split('/')[1];
  Product.findAll({ where: { subcategory: 'piestukai' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Pieštukai',
      //   prods: products,
      //   path: '/',
      //   urlPath: path,
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

// exports.getPenProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findByPk(prodId)
//     .then(product => {
//       res.render('catalog/product-details', {
//         pageTitle: product.title,
//         prod: product,
//         path: '/',
//         isAuthenticated: req.session.isLoggedIn
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       return next(error);
//     });
// }

// --- Spaudos Valdikliai ---

exports.getPrintCatalog = (req, res, next) => {
  // res.render('catalog/spauda', {
  //   pageTitle: 'Spaudos Darbai',
  //   path: '/',
  //   isAuthenticated: req.session.isLoggedIn,
  // });
};

exports.getPrintFlyers = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'skrajutes' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Reklaminės Skrajutės',
      //   prods: products,
      //   path: '/',
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getPrintLeaflets = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'Lankstinukai' } })
    .then((products) => {
      console.log('PRODUKTAI', products);
      return res.status(200).json(products);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};


exports.getProductsBySubcategory = (req, res, next) => {
  console.log('SUBCATEGORY', req.params.subcategory);
  Product.findAll({where: {subcategory: req.params.subcategory}})
    .then((products) => {
      // console.log('PRODUKTAI', products);
      return res.status(200).json(products);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};
exports.getProductsByCategory = (req, res, next) => {
  console.log('CATEGORY', req.params.category);
  Product.findAll({where: {category: req.params.category}})
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

// --- Atšvaitų Valdikliai ---

exports.getReflectorCatalog = (req, res, next) => {
  // res.render('catalog/atsvaitai', {
  //   pageTitle: 'Atšvaitai',
  //   path: '/',
  //   isAuthenticated: req.session.isLoggedIn,
  // });
};

exports.getReflectorStrip = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'juosteles' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Atšvaitai Juostelės',
      //   prods: products,
      //   path: '/',
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getReflectorHang = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'patsvaitai' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Pakabinami Atšvaitai',
      //   prods: products,
      //   path: '/',
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getReflectorVest = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'liemenes' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Šviesą Atspindinčios Liemenės',
      //   prods: products,
      //   path: '/',
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

// --- Vėliavų Valdikliai ---

exports.getFlagCatalog = (req, res, next) => {
  // res.render('catalog/veliavos', {
  //   pageTitle: 'Reklaminės Vėliavos',
  //   path: '/',
  //   isAuthenticated: req.session.isLoggedIn,
  // });
};

exports.getFlag = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'veliavos' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Reklaminės Vėliavos',
      //   prods: products,
      //   path: '/',
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.getFlagAccessories = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'priedai' } })
    .then((products) => {
      // res.render('catalog/products-list', {
      //   pageTitle: 'Reklaminių Vėliavų Pridai',
      //   prods: products,
      //   path: '/',
      //   isAuthenticated: req.session.isLoggedIn,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

// --- Puodelių Valdiklis ---

exports.getMugCeramic = (req, res, next) => {
  Product.findAll({ where: { subcategory: 'keramikiniai puodeliai' } })
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

// --- Kitų Produktų Valdiklis ---

exports.getOtherProducts = (req, res, next) => {
  Product.findAll({ where: { category: 'kiti' } })
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};
