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
  const uploadFiles = upload.array('file', 12);

  uploadFiles(req, res, (err) => {
    const files = req.files;
    if (!files) {
      const error = new Error('Please choose files');
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(files);
  });
};

module.exports = singleUpload;
