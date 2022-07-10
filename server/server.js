const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

// Upload functions test
const uploadMiddleware = require('./src/helpers/uploadMiddleware');

// Create express server app
const app = express();

// Port used by express server
const port = process.env.PORT || 5000;

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

// Route for upload.
app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/multer.html');
});

app.post('/upload', uploadMiddleware, (req, res) => {
  res.send('Uploaded');
});
//------------------------------------------------------------

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

// Server is listening on that port
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
