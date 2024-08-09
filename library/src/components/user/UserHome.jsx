import React, { useState, useEffect } from 'react';
import axios from 'axios';
import createAxios from '../../Services/Axios';

const LibraryHomePage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnDate, setReturnDate] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', id: '' });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const axiosInstance = createAxios();
        const response = await axiosInstance.get('/getBooks'); 
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const axiosInstance = createAxios();
        const response = await axiosInstance.get('/gettransactions');
        console.log(response.data)
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchBooks();
   fetchTransactions();
  }, []);

  const handlePurchase = async () => {
    if (!selectedBook || !returnDate || !userDetails.name ) {
      alert('Please fill in all details');
      return;
    }
    try {
      const axiosInstance = createAxios();
      await axiosInstance.post('/transactions', {
        bookId: selectedBook._id,
        returnDate,
        transactionType: 'purchased'
      });
      alert('Book purchased successfully');
      setSelectedBook(null);
      setReturnDate('');
      setUserDetails({ name: '', id: '' });
    } catch (error) {
      console.error('Error purchasing book:', error);
      alert('Failed to purchase book');
    }
  };

  const handleReturn = async (transactionId) => {
    try {
      await axios.post('/api/returnBook', { transactionId });
      alert('Book returned successfully');
      setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Failed to return book');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-6 px-4">
        <h1 className="text-3xl font-bold">Welcome to Our Library Management System</h1>
        <p className="mt-2">Here you can purchase books and return them after a specific time.</p>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Available Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => {
            const transaction = transactions.find(t => t.bookId === book._id );
            return (
              <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                <p className="text-gray-600 mb-4">
                  Available: {book.currentAvailabilityStatus ? 
                    <span className="text-green-600">Yes</span> : 
                    <span className="text-red-600">No</span>}
                </p>
                {transaction ? (
                  <button 
                    onClick={() => handleReturn(transaction._id)}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Return
                  </button>
                ) : (
                  <button 
                    onClick={() => setSelectedBook(book)}
                    disabled={!book.currentAvailabilityStatus}
                    className={`w-full py-2 px-4 rounded ${
                      book.currentAvailabilityStatus 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Purchase
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {selectedBook && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Purchase Book: {selectedBook.name}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {/* <input
                type="text"
                placeholder="Your ID"
                value={userDetails.id}
                onChange={(e) => setUserDetails({...userDetails, id: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              /> */}
              <input
                type="date"
                placeholder="Return Date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button 
                onClick={handlePurchase}
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LibraryHomePage;
