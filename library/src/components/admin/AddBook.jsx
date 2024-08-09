import React, { useState, useEffect } from 'react';
import createAxios from '../../Services/Axios';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

function AddBook() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    _id: null,
    availability: true
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const axiosInstance = createAxios();
      const response = await axiosInstance.get('/getBooks');
      console.log(response.data, 'getbooooksssssssss')
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const axiosInstance = createAxios();
      let response;
      if (isEditing) {
        response = await axiosInstance.put(`/books/${formData._id}`, formData);
        const updatedBooks = books.map(book => 
          book._id === formData._id ? response.data : book
        );
        setBooks(updatedBooks);
      } else {
        response = await axiosInstance.post('/books', formData);
        setBooks([...books, response.data]);
      }
      
      setFormData({
        name: '',
        author: '',
        _id: null,
        availability: true
      });
      setShowModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/editing book:', error);
    }
  };

//   const handleEdit = (book) => {
//     setFormData(book);
//     setIsEditing(true);
//     setShowModal(true);
//   };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const axiosInstance = createAxios();
        await axiosInstance.delete(`/deleteBooks/${id}`);
        setBooks(books.filter(book => book._id !== id));
        Swal.fire('Deleted!', 'The book has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting book:', error);
        Swal.fire('Error!', 'There was an issue deleting the book.', 'error');
      }
    }
  };


  const handleAvailability = async (book) => {
    try {
      const axiosInstance = createAxios();
      const updatedBook = { ...book, currentAvailabilityStatus: !book.currentAvailabilityStatus };
      const response = await axiosInstance.put(`/books/${book._id}`, updatedBook);
      console.log(response, 'hey chello');
      const updatedBooks = books.map(b => 
        b._id === book._id ? response.data : b
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error updating book availability:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 px-4">Book List</h1>
      {books.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-lg">No books available. Please add your book.</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Your First Book
          </button>
        </div>
      ) : (
        <div>
          <ul className="mb-6">
            {books.map((book) => (
              <li key={book._id} className="mb-2 p-2 px-4 bg-gray-100 rounded flex justify-between items-center">
                <span>
                  <span className="font-semibold">{book.name}</span> by {book.author}
                </span>
                <div>
                  <button
                    onClick={() => handleAvailability(book)}
                    className={`${
                      book.currentAvailabilityStatus ? 'bg-green-500 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-700'
                    } text-white font-bold py-1 px-2 rounded mr-2`}
                  >
                    {book.currentAvailabilityStatus ? 'Available' : 'Unavailable'}
                  </button>
                  {/* <button
                    onClick={() => handleEdit(book)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setFormData({ name: '', author: '', _id: null, availability: true });
              setIsEditing(false);
              setShowModal(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-4 px-4 rounded"
          >
            Add Another Book
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">{isEditing ? 'Edit Book' : 'Add a New Book'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Book Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter book name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter author name"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditing ? 'Update Book' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBook;
