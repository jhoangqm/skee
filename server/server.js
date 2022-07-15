const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
// const multer = require('multer');
// const path = require('path');

// routes require
// const uploadRouter = require('./routes/uploadRoutes');

// App Config
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/image', express.static('image'));

// Router usage not working at the moment
// app.use('/upload', uploadRouter());

// Socket IO setup
const httpServer = require('http').createServer(app);

// route to test upload
const uploadMiddleware = require('./src/helpers/uploadMiddleware');

app.post('/upload', uploadMiddleware, (req, res, next) => {
  console.log(req.body);
  // res.send({ Success: 'Uploaded' });
});

// route used for web socket test
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.json({ testing: 'testing sockets' });
});

// Server is listening on that port
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
