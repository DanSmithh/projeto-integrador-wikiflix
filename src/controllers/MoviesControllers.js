const { Usuario, Review } = require('../models/');






module.exports = {

  // Renderiza a página dobre o filme
  async index(req, res) {

    const idMovie = req.params.id

    const reviews = await Review.findAll({
      where: {
        id_filme: idMovie
      },
      include:{
        model:Usuario,
        as:'usuario',
        require: true
      }
    });

    // console.log(reviews)


    res.render('movie', {usuario: req.session.usuario, idMovie, reviews});
  },

  // Cria review sobre o titulo

  async criarReview(req, res){
    const idMovie = req.params.id;
    const usuario = req.session.usuario;

            await Review.create({
            usuario_id: usuario.id,
            id_filme: idMovie,
            review: req.body.reviews
          })

          const reviews = await Review.findAll({
            where: {
              id_filme: idMovie
            },
            include:{
              model:Usuario,
              as:'usuario',
              require: true
            }
          });

      res.render('movie', {usuario: req.session.usuario, idMovie, reviews} );
    }

  }