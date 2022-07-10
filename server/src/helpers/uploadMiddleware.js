const multer = require('multer');
// const path = require('path');

// This is the storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/tmp_storage'); // Replace 'upload' with destination (need to put DB)
  },
  filename: function (req, file, cb) {
    console.log('====================');
    console.log('file: ', file);
    console.log('====================');
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

// This is the upload function
const singleUpload = (req, res, next) => {
  const uploadSingle = upload.single('myFile');

  uploadSingle(req, res, (err) => {
    if (err) {
      res.status(500).send({
        message: 'multer error',
        error: err,
      });
    } else {
      next();
    }
  });
};

module.exports = singleUpload;
