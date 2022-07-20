import React, { useEffect, useState } from 'react';
const { io } = require('socket.io-client');

// This will connect to the backend server
const socket = io.connect('http://localhost:8000', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

function Sockets() {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on('greeting', data => {
      // Says hello to a new user
      
      setUser(prev => data.username);
      setUsers(prev => data.users);
    });

    socket.on('new user connected', data => {
      // Says to all users
      if (!users.includes(data)) {
        setUsers(data);
      }
    });

    socket.on('DISCONNECT', data => {
      setUsers(prev => prev.filter(name => name !== data));
    });
  }, [user]);

  return (
    <div>
      <h1>Current User : {user}</h1>
      <h3>User List:</h3>
      <p>
        {users.map(user => (
          <li key={users.indexOf(user)}>{user}</li>
        ))}
      </p>
      <button className="btn" onClick={() => socket.emit('CLICKED', 'clicked')}>
        Testing Click Me For Feedback
      </button>
    </div>
  );
}

export default Sockets;
