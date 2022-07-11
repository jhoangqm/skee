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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router usage not working at the moment
// app.use('/upload', uploadRouter());

// Socket IO setup
const httpServer = require('http').createServer(app);
const { Server } = require('socket.io');
// CORS is needed because HTTP requests sent by the frontend are allowed to reach the server.
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // This will communicate with the client
  },
});

let users = [];

io.on('connection', (socket) => {
  // generates random string
  const username = (Math.random() + 1).toString(36).substring(4);
  console.log(`${username} has connected`);

  const testUser = (username) => {
    if (users.includes(username)) {
      testUser();
    }
    users.push(username);
  };
  testUser(username);
  // https://socket.io/docs/v4/emit-cheatsheet/
  socket.emit('welcome', { username, users });
  socket.name = username;
  socket.broadcast.emit('new user connected', users);

  socket.on('disconnect', (data) => {
    // console.log(data)
    console.log(`${socket.name} has disconnected`);
    users = users.filter((name) => name !== socket.name);
    socket.broadcast.emit('DISCONNECT', socket.name);
  });
  // console in server to test if client and server can communicate
  socket.on('CLICKED', (data) => {
    console.log(`${socket.name} has clicked the button`);
  });
});

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
