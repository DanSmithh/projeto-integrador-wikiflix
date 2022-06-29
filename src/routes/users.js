var express = require('express');
var router = express.Router();
const multer = require('multer');
var auth = require('../middleware/auth')
const UsuariosControllers = require('../controllers/UsuariosControllers');
const validatorCadastro = require('../middleware/formValidator')
const { check, validationResult, body } = require('express-validator');
const uploadUser = require('../middleware/uploadImage')


// Criação  de Usuarios
router.post('/cadastrar', [
  check('nome')
    .notEmpty().withMessage('Campo nome é obrigatório!').bail()
    .isLength({ min: 3 }).withMessage('Campo nome precisa ter mais que 3 caracteres'),
  check('email')
    .notEmpty().withMessage('Campo email é obrigatório!').bail()
    .isEmail(),
  check('senha')
    .notEmpty().withMessage('Campo senha é obrigatório').bail()
    .isLength({ min: 3 }).withMessage('Campo senha precisa ter mais que 3 caracteres!')
], uploadUser.single('arquivo'), UsuariosControllers.criar);



// Atentificação
router.get('/login', UsuariosControllers.login);
router.post('/login', validatorCadastro, UsuariosControllers.autenticar);

// Editar usuário
router.get('/editar/:id_hash', auth, UsuariosControllers.form);
router.put('/editar/:id_hash', auth, UsuariosControllers.atualizar);

// Deletar usuário
router.delete('/deletar/:id_hash', UsuariosControllers.deletar);

// Deslogar usuário
router.get('/logout', UsuariosControllers.logout);




module.exports = router;
