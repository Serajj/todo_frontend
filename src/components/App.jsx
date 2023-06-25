import React from 'react'
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import Header from './partials/Header';
import Register from './Register';


function App() {
    //we can use redux also for authentication but here I am using custom method
    const savedUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(savedUser));
  return (
    <>
    <BrowserRouter>
        <Header user = {user} />
        <Routes>
            <Route path="/" element={<Main user = {user} />} />
            
            <Route path="/register" element={<Register user = {user} setUser={setUser} />} />
            <Route path="/login" element={<Login user = {user} setUser={setUser} />} />
        </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
  )
}

export default App;
