var express = require('express');
var auth = require('../middleware/auth')


var router = express.Router();

/* GET home page. */
router.get('/', auth, function (req, res, next) {

  const usuario = req.cookies.usuario;
  req.session.usuario = usuario;



  res.render('catalog', { usuario });
});

module.exports = router;