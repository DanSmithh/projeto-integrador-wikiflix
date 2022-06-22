const bcrypt = require('bcryptjs');
const UserModel = require('../Models/UserModel');
const validatorCadastro = require('./src/middleware/formValidator');
const { validationResult } = require('express-validator');


module.exports = {
  editar(req, res) {
    return res.render('editar-usuario', { erros: null, user: null })
  },

  create(req, res) {
    console.log(validationResult(req))
    const user = req.body;
    const erros = [];

    if (!user) {
      erros.push({ msg: 'Login inválido' });
      return res.render('login', { erros, user })
    }

    UserModel.criar({ ...user, senha: bcrypt.hashSync(user.senha, 12) });
    return res.redirect('/catalog');
  },

  login(req, res) {
    return res.render('login', { erros: null });
  },

  autenticar(req, res) {
    const requestUser = req.body;
    const erros = [];

    if (!requestUser) {
      erros.push({ msg: 'Login ou senha inválidos' });
      return res.render('login', { erros });
    }

    const user = UserModel.buscar(requestUser);

    if (!user) {
      erros.push({ msg: 'Login ou senha inválidos' });
      return res.render('login', { erros });
    }

    const senhasIguais = bcrypt.compareSync(requestUser.senha, user.senha);

    if (!senhasIguais) {
      erros.push({ msg: 'Login ou senha inválidos' });
      return res.render('login', { erros });
    }

    req.session.usuario = user;

    console.log(user)

    return res.render('catalog', { user });
  },


}