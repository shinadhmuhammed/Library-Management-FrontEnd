import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import libraryImage from '../../Assets/LibraryPicture.jpeg';
import createAxios from '../../Services/Axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationError('');
    if (!formData.username || !formData.password) {
      setValidationError('Please enter both username and password.');
      return;
    }

    try {
      const axiosInstance = createAxios();
      const response = await axiosInstance.post('/adminlogin', formData); 
      console.log('Login successful:', response.data, response.data.token);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); 
        navigate('/admin/home'); 
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="flex-1 bg-cover bg-center rounded-l-lg" style={{ backgroundImage: `url(${libraryImage})` }} />
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            {validationError && <p className="text-red-500 mb-4">{validationError}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>} 
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Not a member?{' '}
            <a
              href="/admin" 
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
