exports.get404 = (req, res, next) => {
  console.log('Error 404');

  // res.status(404).render('404', {
  //   pageTitle: 'Page Not Found',
  //   path: '/error',
  //   isAuthenticated: req.session.isLoggedIn
  // });
}

exports.get500 = (req, res, next) => {
  console.log('Error 500');

  // res.status(500).render('500', {
  //   pageTitle: 'Error',
  //   path: '/err500',
  //   isAuthenticated: req.session.isLoggedIn
  // });
}