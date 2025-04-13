// src/components/EditUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  // Fetch user info
  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      const { data } = response.data;
      setUserData({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
      });
    } catch (error) {
      setMessage('Error fetching user data.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, userData);
      setMessage('User updated successfully.');
      // You can also navigate back to the users list after a short delay:
      setTimeout(() => navigate('/users'), 1000);
    } catch (error) {
      setMessage('Error updating user.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleUpdate} className="w-50">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input 
            type="text" 
            name="first_name" 
            className="form-control" 
            value={userData.first_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input 
            type="text" 
            name="last_name" 
            className="form-control" 
            value={userData.last_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            value={userData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
