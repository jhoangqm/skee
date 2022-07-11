// Routes is not working right now will check later

const express = require('express');
const router = express.Router();
// Upload functions test
// const uploadMiddleware = require('./src/helpers/uploadMiddleware');
module.exports = () => {
  router.get('/upload', (req, res) => {
    res.json({ Success: 'Uploaded' });
  });

  router.post('/upload', (req, res) => {
    console.log('HEY U SENT SOMETHING');
    // res.send({ Success: 'Uploaded' });
  });
  //------------------------------------------------------------

  return router;
};
