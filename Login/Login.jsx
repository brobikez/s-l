import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import loginImage from './loginsideImage.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    const userType = localStorage.getItem('userType');

    const validEmailRegex = /^(.*)@(gmail\.com|yahoo\.com)$/;
    if (!validEmailRegex.test(email)) {
      setError('Email must end with @gmail.com or @yahoo.com');
      return;
    }

    if (email === storedEmail && password === storedPassword) {
      if (userType === 'Host') {
        navigate('/CarPartnershipHome');
      } else if (userType === 'Customer') {
        navigate('/');
      } else if (userType === 'Driver') {
        navigate('/DriverDashboard');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setEmail(value);

    const validEmailRegex = /^(.*)@(gmail\.com|yahoo\.com)$/;
    if (!validEmailRegex.test(value)) {
      setError('Email must end with @gmail.com or @yahoo.com');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col lg:flex-row max-w-4xl w-full">
        {/* Login Form */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-300 pr-0 lg:pr-6 pb-6 lg:pb-0">
          <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="flex items-center bg-purple-200 px-3 py-2 rounded-lg">
                <FaUser className="text-purple-600 mr-2" />
                <input
                  type="text"
                  placeholder="Email ID"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-purple-200 outline-none text-gray-700 w-full"
                />
              </label>
            </div>
            <div className="mb-4 relative">
              <label className="flex items-center bg-purple-200 px-3 py-2 rounded-lg">
                <FaLock className="text-purple-600 mr-2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-purple-200 outline-none text-gray-700 w-full"
                />
                <div
                  className="absolute right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
                </div>
              </label>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold mt-4 hover:bg-blue-700 transition duration-300">
              Login Now
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600 font-bold">Login with others</p>
            <div className="flex flex-col gap-3 mt-4">
              <button className="flex items-center justify-center px-4 py-2 w-full border-2 border-gray-300 rounded-full shadow-md bg-white hover:bg-gray-100 transition duration-300">
                <FaGoogle className="text-red-600 mr-2" />
                <span className="font-semibold text-gray-700">
                  Login with{' '}
                  <span className="text-blue-600">G</span>
                  <span className="text-red-600">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-600">g</span>
                  <span className="text-green-600">l</span>
                  <span className="text-red-600">e</span>
                </span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 w-full border-2 border-gray-300 rounded-full shadow-md bg-white hover:bg-gray-100 transition duration-300">
                <FaFacebook className="text-blue-600 mr-2" />
                <span className="font-semibold text-gray-700">Login with Facebook</span>
              </button>
            </div>
          </div>
          <div className="text-center mt-6">
            <p>
              Don’t have an account?{' '}
              <a href="/signup" className="text-blue-600 font-semibold hover:underline">
                Sign up
              </a>
            </p>
            <p>
              <a href="/help" className="text-blue-600 font-semibold hover:underline">
                Need Help?
              </a>
            </p>
          </div>
        </div>

        {/* Side Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg mt-6 lg:mt-0 lg:ml-6 p-4">
          <img
            src={loginImage}
            alt="login-side"
            className="rounded-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}