import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserSignupPage from '../Pages/UserPages/UserSignupPage';
import UserLoginPage from '../Pages/UserPages/UserLoginPage';
import UserHomePage from '../Pages/UserPages/UserHomePage';



function UserRouter() {
  return (
    <div>
       <Routes>
        <Route path='/' element={<UserLoginPage/>}/> 
        <Route path='/signup' element={<UserSignupPage/>}/> 
        <Route path='/home' element={<UserHomePage/>}/> 
      </Routes>
    </div>
  )
}

export default UserRouter
