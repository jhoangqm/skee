import React, { useEffect, useState } from 'react';
const { io } = require("socket.io-client");
// will replace this with .env later on
const serverEndpoint = 'http://localhost:5000'





function Sockets() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [to, setTo] = useState("");
  const [socket, setSocket] = useState();

  useEffect(() => {
    // This will connect to the backend server
    const socket = io.connect(serverEndpoint, {
      reconnectionDelay: 5000,
      reconnection: true,
      reconnectionAttemps: 20,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    }); 
    setSocket(socket);

    socket.on('connect', () => {
      console.log("Connected!");
    });

    socket.on('user', msg => {
      setMessages(prev => [`${msg.from} says:" ${msg.text}`, ...prev,]);
    });

    socket.on('server', msg => {
      setMessages(prev => [msg, ...prev,]);
    });

    socket.on('name', (data) => {
      setName(data);
    });

    return () => socket.disconnect();
  }, []);

  const send = function() {
    socket.emit("message", {to, text});
  };

  return (
    <div className="flex-col shadow-md">
      <h1>Web Sockets React</h1>
      <div className="my-3 font-bold text-lg tracking-wide">Current user: {name}</div>

      <div className='my-3 font-bold text-lg tracking-wide'>
        DM a user: 
        <input
          onChange={event => setTo(event.target.value)}
          value={to}
          placeholder="PM user" />
      </div>

        <ul className='w-3/4 mx-4 my-2 p-2 rounded-lg'>
          {messages.map(msg => <li>{msg}</li>)}
        </ul>
      <div>
        <textarea className='flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none'
          onChange={e => setText(e.target.value)}
          placeholder="Type a message" />
      </div>
      <button className='m-2' onClick={send} >Send</button>

      <button className='m-2' onClick={() => setMessages([])}>Clear</button>

    </div >
  );
}
export default Sockets;