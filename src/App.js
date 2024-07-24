import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; 

const socket = io('http://localhost:8080');

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [msgId, setMsgId] = useState(0);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, { ...msg, id: msgId }]);
      setMsgId((prevId) => prevId + 1);
    };

    const handleDeleteMessage = (id) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    };

    socket.on('message', handleMessage);
    socket.on('deleteMessage', handleDeleteMessage);

    return () => {
      socket.off('message', handleMessage);
      socket.off('deleteMessage', handleDeleteMessage);
    };
  }, [msgId]);

  const sendMessage = () => {
    if (name && message) {
      socket.emit('message', { Name: name, Message: message });
      setMessage('');
    }
  };

  const deleteMessage = (id) => {
    socket.emit('deleteMessage', id);
  };

  return (
    <div id="container">
      <h1 id="head">Chat App</h1>
      <input
        placeholder="Enter your name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Enter your message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <br />
      <button onClick={sendMessage}>Send</button>
      <br />
      <br />
      <div id="messageWrapper">
        {messages.map((msg) => (
          <p key={msg.id} id={`msg${msg.id}`}>
            <b>{name === msg.Name ? 'You' : msg.Name}:</b> {msg.Message}
            {name === msg.Name && (
              <button onClick={() => deleteMessage(msg.id)}>Delete Message</button>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
