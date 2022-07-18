const multer = require('multer');
const path = require('path');

let imageName = '';

// This is the storage
const storage = multer.diskStorage({
  destination: path.join('./image'),
  filename: function (req, file, cb) {
    console.log('====================');
    console.log('file: ', file);
    console.log('====================');
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
});

// This is the upload function
const singleUpload = (req, res, next) => {
  const uploadFiles = upload.single('file');

  uploadFiles(req, res, err => {
    if (err) {
      console.log('Error: ', err);
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    console.log('Image name: ', imageName);
    res.status(201).json({ url: 'http://localhost:8000/image/' + imageName });
  });
};

module.exports = singleUpload;
