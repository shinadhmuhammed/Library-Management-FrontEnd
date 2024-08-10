import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import createAxios from '../../Services/Axios';

const LibraryHomePage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnDate, setReturnDate] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', id: '' });
  const [transactions, setTransactions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTransactions, setModalTransactions] = useState([]);
  const navigate = useNavigate(); 

  
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
        adminId: selectedBook.adminId,
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewTransactions = async () => {
    setIsDropdownOpen(false); 
    try {
      const axiosInstance = createAxios();
      const response = await axiosInstance.get('/gettransactions');
      setModalTransactions(response.data);
  
      const bookDetailsPromises = response.data.map(transaction => 
        axiosInstance.get(`/getUserBook?bookId=${transaction.bookId}`)
      );
      
      const booksDetails = await Promise.all(bookDetailsPromises);
      
      const transactionsWithBookDetails = response.data.map((transaction, index) => ({
        ...transaction,
        bookDetails: booksDetails[index].data,
      }));
      
      setModalTransactions(transactionsWithBookDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching transactions or books:', error);
      alert('Failed to fetch transactions');
    }
  };
  






  const fetchBook = async () => {
    try {
      const axiosInstance = createAxios();
      if (modalTransactions.length > 0) {
        for (const transaction of modalTransactions) {
          const response = await axiosInstance.get(`/getUserBook?bookId=${transaction.bookId}`);
          console.log(response.data); 
        }
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  }

  useEffect(() => {
    fetchBook();
  }, []);
 


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };



  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-slate-800 text-white py-4 px-4 flex flex-col sm:flex-row justify-between items-center shadow-lg">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome to Our Library Management System
          </h1>
          <p className="mt-2 text-sm sm:text-base">
            Here you can purchase books and return them after a specific time.
          </p>
        </div>
        <div className="relative mt-4 sm:mt-0">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <button
                onClick={handleViewTransactions}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Transactions
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Available Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => {
            const transaction = transactions.find((t) => t.bookId === book._id);
            return (
              <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {book.name}
                </h3>
                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                <p className="text-gray-600 mb-4">
                  Available:{" "}
                  {book.currentAvailabilityStatus ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </p>
                {transaction ? (
                  <div className="w-full py-2 px-4 bg-gray-400 text-white text-center rounded cursor-default">
                    Purchased
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedBook(book)}
                    disabled={!book.currentAvailabilityStatus}
                    className={`w-full py-2 px-4 rounded ${
                      book.currentAvailabilityStatus
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Purchase Book: {selectedBook.name}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Your Transactions
              </h2>
              <button onClick={closeModal} className="text-2xl">
                &times;
              </button>
            </div>
            {modalTransactions.length > 0 ? (
              <ul className="space-y-4">
                {modalTransactions.map((transaction) => (
                  <li key={transaction._id} className="border-b pb-2">
                    <p>Book Name: {transaction.bookDetails.name}</p>
                    <p>Author: {transaction.bookDetails.author}</p>
                    <p>
                      Return Date:{" "}
                      {new Date(transaction.dueDate).toLocaleDateString()}
                    </p>
                    <p>Type: {transaction.transactionType}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



export default LibraryHomePage;
