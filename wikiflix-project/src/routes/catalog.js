var express = require('express');
var auth = require('../middleware/auth')


var router = express.Router();

/* GET home page. */
router.get('/', auth, function (req, res, next) {


  
  res.render('catalog', { usuario: req.session.usuario });
});

module.exports = router;