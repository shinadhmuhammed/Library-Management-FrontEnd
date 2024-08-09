import React, { useState } from "react";
import { Link } from "react-router-dom";
import libraryImage from "../../Assets/LibraryPicture.jpeg";
import createAxios from "../../Services/Axios";

function UserSignup() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const axiosInstance = createAxios();
      const response = await axiosInstance.post("/signup", formData);
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6">User SignUp</h2>
          {formError && <p className="text-red-500 mb-4">{formError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`border ${
                  errors.username ? "border-red-500" : "border-gray-400"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your username"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`border ${
                  errors.name ? "border-red-500" : "border-gray-400"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your name"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border ${
                  errors.email ? "border-red-500" : "border-gray-400"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Number
              </label>
              <input
                type="number"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`border ${
                  errors.contact ? "border-red-500" : "border-gray-400"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your contact number"
                required
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`border ${
                  errors.password ? "border-red-500" : "border-gray-400"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500`}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
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
              Already have an account?{" "}
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div
          className="flex-1 bg-cover bg-center rounded-r-lg"
          style={{ backgroundImage: `url(${libraryImage})` }}
        />
      </div>
    </div>
  );
}

export default UserSignup;
