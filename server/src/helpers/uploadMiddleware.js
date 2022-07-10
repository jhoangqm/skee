const multer = require('multer');
const path = require('path');

// This is the storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Replace 'upload' with destination (need to put DB)
  },
  filename: function (req, file, cb) {
    console.log('====================');
    console.log('file: ', file);
    console.log('====================');
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// This is the upload function
const singleUpload = (req, res, next) => {
  const uploadFiles = upload.array('files', 12);

  uploadFiles(req, res, (err) => {
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
