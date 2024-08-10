import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import createAxios from '../../Services/Axios';

function AdminTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const axiosInstance = createAxios();
        const response = await axiosInstance.get('/getTransaction');
        const transactionsData = response.data;

        setTransactions(transactionsData);
        setLoading(false);

        transactionsData.forEach(transaction => {
          sendTransactionDetails(transaction.userId, transaction.bookId);
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const sendTransactionDetails = async (userId, bookId) => {
    try {
      const axiosInstance = createAxios();
      const response = await axiosInstance.post('/details', {
        userId,
        bookId,
      });

      const { bookDetails, userDetails } = response.data;

      setTransactions(prevTransactions =>
        prevTransactions.map(transaction => {
          if (transaction.userId === userId && transaction.bookId === bookId) {
            return {
              ...transaction,
              bookDetails: bookDetails[0] || {},
              userDetails: userDetails[0] || {},
            };
          }
          return transaction;
        })
      );
    } catch (error) {
      console.error('Error sending transaction details:', error);
    }
  };

  const handleRemind = async (userId, bookId) => {
    try {
      const transaction = transactions.find(
        (transaction) => transaction.userId === userId && transaction.bookId === bookId
      );

      if (!transaction || !transaction.userDetails || !transaction.bookDetails) {
        console.error('Transaction details not found');
        return;
      }

      const email = transaction.userDetails.email;
      const bookName = transaction.bookDetails.name;

      const axiosInstance = createAxios();
      const response = await axiosInstance.post('/sendReminder', {
        email,
        bookName,
      });

      if (response.data.success) {
        console.log('Reminder sent successfully');
      } else {
        console.log('Failed to send reminder');
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">Error fetching transactions: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Transactions</h2>
        {transactions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {transactions.map(transaction => (
              <div key={transaction._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-800">{transaction.transactionType}</p>
                  <p className="text-sm text-gray-600">Due: {new Date(transaction.dueDate).toLocaleDateString()}</p>
                  
                  {transaction.bookDetails && (
                    <div className="mt-4">
                      <h3 className="text-md font-semibold text-gray-700">Book Details</h3>
                      <p className="text-sm text-gray-600">Name: {transaction.bookDetails.name}</p>
                      <p className="text-sm text-gray-600">Author: {transaction.bookDetails.author}</p>
                      <p className="text-sm text-gray-600">
                        Status: 
                        <span className={`font-semibold ${transaction.bookDetails.currentAvailabilityStatus ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.bookDetails.currentAvailabilityStatus ? ' Available' : ' Not Available'}
                        </span>
                      </p>
                    </div>
                  )}

                  {transaction.userDetails && (
                    <div className="mt-4">
                      <h3 className="text-md font-semibold text-gray-700">User Details</h3>
                      <p className="text-sm text-gray-600">Name: {transaction.userDetails.name}</p>
                      <p className="text-sm text-gray-600">Email: {transaction.userDetails.email}</p>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3">
                  <button
                    onClick={() => handleRemind(transaction.userId, transaction.bookId)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Remind
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminTransaction;
