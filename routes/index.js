var express = require('express');
var path = require('path');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Upload' });
});

router.post('/', (req, res, next)=>{
  var coba = req.files.fileContoh;
  var lokasi = path.join('public', coba.name);
  var respon = {};
  respon.encoding = coba.encoding;
  respon.md5 = coba.md5;
  respon.mimetype = coba.mimetype;
  respon.name = coba.name;
  respon.size = coba.size;
  respon.tempFilePath = coba.tempFilePath;
  respon.truncated = coba.truncated;
 
  coba.mv(lokasi, (err)=>{
    if (err) {
      return res.status(500).send(err);
    }
    res.send(respon); 
  });

});

router.get('/upload.html', (req, res, next) =>{
  res.render('upload', {title: 'Upload'});
});
router.post('/upload.html', (req, res, next) => {
  var fileUpload = req.files.fileUpload;
  var lokasi = path.join('public', fileUpload.name);
  fileUpload.mv(lokasi, (err)=>{
    if (err) {
      res.send('Gagal');
    } else {
      res.send('Berhasil'); 
    }
  })
});

module.exports = router;
