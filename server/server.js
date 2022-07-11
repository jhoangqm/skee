const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

// const session = require('express-session');
// app.use(session({ keys: ['abc'], name: 'user' }));

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

const clients = {};

// Creating connection for socket

io.on('connection', (client) => {
  const name = (Math.random() + 1).toString(36).substring(4);
  console.log('Someone connected!', client.id, name);
  client.name = name;
  clients[name] = client.id;
  console.log(clients);

  client.broadcast.emit('server', `${name}: just connected`);

  // console.log(client);

  client.emit('name', name);

  client.on('message', (data) => {
    console.log('message:', data);
    data.from = client.name;

    if (data.to) {
      ///  send to specific user
      const id = clients[data.to];
      console.log('message is for: ', data.to, id);
      io.to(id).emit('user', data);
      return;
    }

    // Send to all
    client.broadcast.emit('user', data);
  });

  client.on('disconnect', () => {
    delete clients[client.name];
    console.log('Client Disconnected!', client.name);
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
