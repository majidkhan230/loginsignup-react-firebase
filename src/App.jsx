import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'
const App = () => {
  return (
    <div>
  
  <Routes>
    <Route path="*" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/profile" element={<Profile/>} />
  </Routes>
    <ToastContainer/>

  {/* <Login/> */}
  {/* <Signup/> */}
    </div>
  )
}

export default App
