// src/App.tsx
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Check if all fields are filled
    if (formData.name && formData.phoneNumber && formData.email) {
      // Save user details in localStorage
      localStorage.setItem('userDetails', JSON.stringify(formData));
      // Redirect to the second page
      navigate('/second-page');
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  return (
    <div>
      <h1>User Information Form</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

function SecondPage() {
  // Retrieve user details from localStorage
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  return (
    <div>
      <h1>Welcome to the Second Page</h1>
      <p>User Details:</p>
      <ul>
        <li>Name: {userDetails.name}</li>
        <li>Phone Number: {userDetails.phoneNumber}</li>
        <li>Email: {userDetails.email}</li>
      </ul>
    </div>
  );
}

function AppWithRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/second-page" element={<SecondPage />} />
    </Routes>
  );
}

export default AppWithRoutes;
