var express = require('express');
const moviesControllers = require('../controllers/MoviesControllers')


var router = express.Router();

// Renderizar página de filme
router.get('/:id', moviesControllers.index);

// Salva review no banco
router.post('/:id', moviesControllers.criarReview);

// Excluir review do banco
router.delete('/:idMovie/:idReview', moviesControllers.deleteReview);





module.exports = router;