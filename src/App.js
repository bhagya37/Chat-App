import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Chat from "./chat";


function App(){
  return(
    <>
    <BrowserRouter>
    {/* <NavLink to="/Chat">Login</NavLink> */}
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Chat" element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;