// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/users" 
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          } 
        />
        {/* Redirect any unknown paths to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
