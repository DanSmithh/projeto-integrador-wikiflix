const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { Usuario, Review } = require('../models');
const { validationResult } = require('express-validator');
const { v4: uuid_v4 } = require('uuid');

module.exports = {
  login(req, res) {
    return res.render('login', { erros: null, sucess: null });
  },

  async criar(req, res) {
    try {
      const { nome, sobrenome, email, senha, confirmeSenha, arquivo } = req.body;
      console.log(req.file)
      const erros = [];
      const sucess = [];

      const verificarUsuario = await (Usuario.findOne({
        where: {
          email: email
        }
      }))

      if (verificarUsuario) {
        erros.push({ msg: 'Usuário já cadastrado!' });
        return res.render('login', { erros });
      }

      if (senha === confirmeSenha) {
        const usuario = await Usuario.create({
           nome,
           sobrenome,
           email,
           name_img: req.file.filename,
           senha: bcrypt.hashSync(senha, 12),
           id_hash: uuid_v4(),
          });

        console.log(usuario)

        sucess.push({ msg: 'Usuário criado com sucesso!' });

        return res.render('login', { erros: null, sucess });

      } else {
        erros.push({ msg: 'As senhas não conferem!' });
        return res.render('login', { erros });
      }

    } catch (erro) {
      console.log(erro)

    }
  },

  async autenticar(req, res) {
    try {
      const requestUser = req.body;
      const erros = [];

      if (!requestUser) {
        erros.push({ msg: 'Login ou senha inválidos' });
        return res.render('login', { erros });
      }

      const usuario = await Usuario.findOne({
        attributes: ['id', 'id_hash', 'nome', 'sobrenome', 'email', 'name_img', 'senha'],
        where: {
          email: requestUser.email
        }
      });

      if (!usuario) {
        erros.push({ msg: 'Usuário não cadastrado!' });
        return res.render('login', { erros });
      }

      const senhasIguais = bcrypt.compareSync(requestUser.senha, usuario.senha);

      if (!senhasIguais) {
        erros.push({ msg: 'Login ou senha inválidos' });
        return res.render('login', { erros });
      }

      req.session.usuario = usuario;

      console.log(usuario)

      return res.render('catalog', { usuario });

    } catch (erro) {
      console.log(erro);
    }
  },

  async form(req, res) {
    try {
      const { id_hash } = req.params

      const usuario = await Usuario.findOne({
        where: {
          id_hash: id_hash
        }
      })

      req.session.usuario = usuario;

      return res.render('editar-usuario', { erros: null, success: null, usuario })

    } catch (erro) {
      console.log(erro);
    }

  },

  async atualizar(req, res) {
    try {
      const { id_hash } = req.params;
      const { nome, sobrenome, email, senha, confirmeSenha } = req.body;
      const erros = [];
      const success = [];



      if(senha === confirmeSenha) {
        await Usuario.update({ nome, sobrenome, email, senha: bcrypt.hashSync(senha, 12) }, {
          where: { id_hash }
        })

        const usuario = await Usuario.findOne({
          where: {
            id_hash: id_hash
          }
        })
        req.session.usuario = usuario;

        success.push({ msg: 'Atualizações realizadas com sucesso!' });

        return res.render('editar-usuario', { erros: null, success , usuario })

      } else {

        erros.push({ msg: 'As senhas não conferem!' });
        return res.render('editar-usuario', { erros, success: null, usuario: req.session.usuario });
        
      }
    
    } catch (erro) {
      console.log(erro);
    }
  },

  async deletar(req, res) {
    try {
      const { id_hash } = req.params

      await Usuario.destroy({
        where: {
          id_hash: id_hash
        }
      })

      return res.redirect('/');

    } catch (erro) {
      console.log(erro);
    }
  },

  logout(req, res) {

    if (req.session) {
      req.session.destroy();
    }
    return res.redirect('/')
  }
}