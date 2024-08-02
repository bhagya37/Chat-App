// import React, { useState }  from "react";
// import { Link } from "react-router-dom";


// function Login(){

//   const [name,setName] = useState('');
//   const[number,setNumber] = useState('');
//   return(
//     <>
//     <div id="login-box">
//       <input placeholder="Enter your name"
//       value={name}
//       onChange={(e) =>setName(e.target.value)}
//       />
//       <input placeholder="Enter your number"
//       value={number}
//       onChange={(e)=>setNumber(e.target.value)}/>
//      <Link to='/Chat'><button>Login</button> </Link>  
//     </div>
//     </>
//   )
// }
// export default Login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

function Login() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, number }),
      });

      if (response.ok) {
        navigate('/chat'); 
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div id="login-box">
      <h1>Login</h1>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Enter your number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
