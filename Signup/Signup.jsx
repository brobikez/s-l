import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import signupImage from './signupimage.png';

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/; // Name must only contain alphabets and spaces
    const emailRegex = /^[a-z0-9]+@[a-z]+\.com$/; // Email must be lowercase and no spaces
    const allowedDomains = ['@yahoo.com', '@email.com']; // Only these domains are allowed
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{6,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // Name Validation
    if (!nameRegex.test(form.name)) {
      newErrors.name = 'Name should only contain alphabets and spaces, no numbers';
    }

    // Email Validation
    if (!emailRegex.test(form.email) || !allowedDomains.some((domain) => form.email.endsWith(domain))) {
      newErrors.email = 'Email must be lowercase, no spaces, and end with @yahoo.com or @email.com';
    }

    // Password Validation
    if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must include an uppercase letter, a special character, and at least 6 characters';
    }

    // Confirm Password Validation
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone Validation
    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'Phone number must start with 6, 7, 8, or 9 and have 10 digits';
    }

    // User Type Validation
    if (!form.userType) newErrors.userType = 'Please select who you are';

    // Terms Accepted Validation
    if (!form.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('userEmail', form.email);
      localStorage.setItem('userPassword', form.password);
      localStorage.setItem('userType', form.userType);

      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="lg:flex lg:items-center lg:justify-between w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2 h-full">
          <img src={signupImage} alt="Sign Up" className="object-cover w-full h-full" />
        </div>
        <div className="w-full lg:w-1/2 p-6 lg:p-10">
          <h2 className="text-4xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              pattern="[6-9][0-9]{9}"
              maxLength="10"
              className="w-full p-3 border border-gray-300 rounded"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}

            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="">Who you are</option>
              <option value="Customer">Customer</option>
              <option value="Host">Host</option>
              <option value="Driver">Driver</option>
            </select>
            {errors.userType && <p className="text-red-500">{errors.userType}</p>}             

            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleChange}
                className="mr-2"
              />
              <label>I accept the terms and conditions</label>
            </div>
            {errors.termsAccepted && <p className="text-red-500">{errors.termsAccepted}</p>}

            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">
              Sign Up Here
            </button>
            <p className="text-center">
              Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
