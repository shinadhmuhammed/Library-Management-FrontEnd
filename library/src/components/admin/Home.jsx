import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to Library Management
              </h1>
              <p className="text-gray-600 mb-6">
                As an administrator, you can manage books, users, and transactions. 
                Get started by adding a new book to the library.
              </p>
              <Link 
                to="/admin/add-book" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add a Book
              </Link>
            </div>
          </main>
        </div>
      )
}

export default Home
