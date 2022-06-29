const multer = require('multer');

module.exports = (multer({
  storage: multer.diskStorage({
  destination:(req, file, callback) => {
    callback(null, 'public/images/uploads');
  },

  filename(req, file, callback) {
    const [filename, extension] = file.originalname.split('.');
    callback(null, filename + '-' + Date.now() + '.' + extension);
  }
})

}))

