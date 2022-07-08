const cors = require('cors');
const express = require('express');
const multer = require('multer');

// Create express server app
const app = express();

// Port used by express server
const port = process.env.PORT || 5000;

// use cors

// Create http server
const httpServer = require('http').createServer(app);
// Web Socket called on the server with cors
const { Server } = require('socket.io');
// CORS is needed because HTTP requests sent by the frontend are allowed to reach the server.
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // This will communicate with the client
  },
});

// use cors
app.use(cors());

// route used for web socket test
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// IO websocket connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// SET STORAGE + multer routes
app.get('/multer-test', (req, res) => {
  res.sendFile(__dirname + '/multer.html');
});

// This is for uploading single file
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

// Server is listening on that port
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
