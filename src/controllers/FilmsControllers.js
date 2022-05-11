

module.exports = {
  index(req, res) {

    const usuario = req.cookies.usuario;
    req.session.usuario = usuario;

    res.render('movie', { usuario });
  },


}