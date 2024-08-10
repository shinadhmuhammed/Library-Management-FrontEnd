import React from 'react'
import { Routes, Route } from "react-router-dom";
import Signup from '../components/admin/Signup';
import LoginPage from '../Pages/AdminPages/LoginPage';
import HomePage from '../Pages/AdminPages/HomePage';
import AddBookPage from '../Pages/AdminPages/AddBookPage';
import TransactionPage from '../Pages/AdminPages/TransactionPage';

function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/add-book' element={<AddBookPage/>}/>
        <Route path='/transactions' element={<TransactionPage/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
