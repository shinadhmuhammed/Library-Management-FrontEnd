import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import libraryImage from '../../Assets/LibraryPicture.jpeg';
import createAxios from '../../Services/Axios.js';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    email: '',
    contact: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    password: '',
    email: '',
    contact: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value) error = 'Username is required.';
        break;
      case 'name':
        if (!value) error = 'Name is required.';
        break;
      case 'password':
        if (!value) {
          error = 'Password is required.';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long.';
        } else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value)) {
          error = 'Password must include uppercase, lowercase, digit, and special character.';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email address is invalid.';
        }
        break;
      case 'contact':
        if (!value) error = 'Contact number is required.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let isValid = true;
    for (const field in formData) {
      if (formData[field] === '') {
        isValid = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
        }));
      }
    }

    if (!isValid || Object.values(errors).some((error) => error)) {
      setFormError('Please complete the form.');
      return;
    }

    try {
      const axiosInstance = createAxios();
      const response = await axiosInstance.post('/adminSignup', formData);
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          {formError && <p className="text-red-500 mb-4">{formError}</p>}
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
                className={`border ${errors.username ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your username"
                required
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`border ${errors.name ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                className={`border ${errors.password ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your password"
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">
                Contact Number
              </label>
              <input
                type="number"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`border ${errors.contact ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your contact number"
                required
              />
              {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/admin/login" className="text-blue-500 hover:text-blue-700 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1 bg-cover bg-center rounded-r-lg" style={{ backgroundImage: `url(${libraryImage})` }} />
      </div>
    </div>
  );
}

export default Signup;
