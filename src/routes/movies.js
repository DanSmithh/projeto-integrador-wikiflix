var express = require('express');
const moviesControllers = require('../controllers/FilmsControllers')


var router = express.Router();

/* GET home page. */
router.get('/', moviesControllers.index)



module.exports = router;