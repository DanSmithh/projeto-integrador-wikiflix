var express = require('express');
const IndexControllers = require('../controllers/IndexControllers');
var router = express.Router();

/* GET home page. */
router.get('/', IndexControllers.index);


module.exports = router;
