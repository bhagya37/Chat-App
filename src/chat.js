// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import './App.css'; 

// const socket = io('http://localhost:8080');

// function Chat() {
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [msgId, setMsgId] = useState(0);

//   useEffect(() => {
//     const handleMessage = (msg) => {
//       setMessages((prevMessages) => [...prevMessages, { ...msg, id: msgId }]);
//       setMsgId((prevId) => prevId + 1);
//     };

//     const handleDeleteMessage = (id) => {
//       setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
//     };

//     socket.on('message', handleMessage);
//     socket.on('deleteMessage', handleDeleteMessage);

//     return () => {
//       socket.off('message', handleMessage);
//       socket.off('deleteMessage', handleDeleteMessage);
//     };
//   }, [msgId]);

//   const sendMessage = () => {
//     if (name && message) {
//       socket.emit('message', { Name: name, Message: message });
//       setMessage('');
//     }
//   };

//   const deleteMessage = (id) => {
//     socket.emit('deleteMessage', id);
//   };

//   return (
//     <div id="container">
//       <h1 id="head">Chat App</h1>
//       <input
//         placeholder="Enter your name"
//         id="name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <br />
//       <br />
//       <input
//         placeholder="Enter your message"
//         id="message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <br />
//       <br />
//       <button onClick={sendMessage}>Send</button>
//       <br />
//       <br />
//       <div id="messageWrapper">
//         {messages.map((msg) => (
//           <div key={msg.id} className={`message ${name === msg.Name ? 'msg-left' : 'msg-right'}`}>
//             <b>{name === msg.Name ? 'You' : msg.Name}:</b> {msg.Message}
//             {name === msg.Name && (
//               <span className="delete" onClick={() => deleteMessage(msg.id)}>Delete Message</span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Chat;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; 

const socket = io('http://localhost:8080');

function Chat() {
  const [name, setName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (name) {
      socket.emit('register', name);
    }
  }, [name]);

  useEffect(() => {
    const handlePrivateMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on('privateMessage', handlePrivateMessage);

    return () => {
      socket.off('privateMessage', handlePrivateMessage);
    };
  }, []);

  const sendMessage = () => {
    if (name && recipient && message) {
      const msg = { sender: name, recipient, text: message, senderSocketId: socket.id };
      socket.emit('privateMessage', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage('');
    }
  };

  return (
    <div id="container">
      <h1 id="head">One-to-One Chat App</h1>
      <input
        placeholder="Your Name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Recipient Name"
        id="recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter your message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={sendMessage}>Send</button>
      <br />
      <div id="messageWrapper">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === name ? 'msg-left' : 'msg-right'}`}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
