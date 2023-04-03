const fileHelper = require('../utils/file');

const { validationResult } = require('express-validator/check');

const Product = require('../models/product');

let previousUrl;

exports.getAddProduct = (req, res, next) => {
  // res.render('admin/add-product', {
  //   pageTitle: 'Add Product',
  //   path: '/admin/add-product',
  //   editing: false,
  //   hasError: false,
  //   isAuthenticated: req.session.isLoggedIn,
  //   errorMessage: [],
  //   validationErrors: [],
  // });
};

exports.getEditProduct = (req, res, next) => {
  previousUrl = req.headers.referer.replace(/(?:.*?\/){3}/, '/');
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { category, subcategory, title, price1, price2, price3, price4, price5, price6, description } = req.body;
  console.log('REQUEST FAILAI', req.files);
  console.log('REQUEST BODIS', req.body);
  const images = req.files;
  // const images = req.body.imageUrl;
  // console.log('FILES', images);
  if (!images) {
    return res.status(422).json({message: 'No images selected!'});
  }
  let imgArray = [];
  images.map(img => {
    imgArray.push(img.path);
  });
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({message: errors.array()});
  }
  const imageUrl = imgArray;
  console.log(imageUrl);

  Product.create({ category, subcategory, title, price1, price2, price3, price4, price5, price6, description, imageUrl })
    .then((result) => {
      console.log('Product has been created!');
      res.status(201).json({message: 'Produktas sukurtas sėkmingai', data: result});
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { id, category, subcategory, title, price1, price2, price3, price4, price5, price6, description } = req.body;
  const images = req.files;
  const errors = validationResult(req);

  // console.log('EDITING_IS_CONTROLLERIO', req.body);
  // console.log('ID_IS_CONTROLLERIO', id);

  if (!errors.isEmpty()) {
    res.status(422).json({message: errors.array()[0].msg});   
  }
  let imgArray = [];

  Product.findByPk(id)
    .then((product) => {
      product.category = category;
      product.subcategory = subcategory;
      product.title = title;
      product.price1 = price1;
      product.price2 = price2;
      product.price3 = price3;
      product.price4 = price4;
      product.price5 = price5;
      product.price6 = price6;
      if (images.length > 0) {
        fileHelper.deleteFile(product.imageUrl);
        images.map(img => {
          imgArray.push(img.path);
        });
        product.imageUrl = imgArray;
      }
      product.description = description;
      return product.save();
    })
    .then((result) => {
      console.log('Product has been updated!');
      res.status(201).json({message: 'Produktas sėkmingai atnaujintas.'});
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        next(new Error('Product not found.'));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.destroy({ where: { id: prodId } });
    })
    .then((result) => {
      console.log('Product has been deleted!');
      res.status(200).json({message: 'Produktas sėkmingai ištrintas.'});
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};
