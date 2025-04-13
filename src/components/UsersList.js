// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = async (pageNum = 1) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNum}`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setMessage('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Client-side search filter
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      // Remove from UI
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
      setMessage('User deleted successfully.');
    } catch (error) {
      setMessage('Error deleting user.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by name..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={user.avatar} className="card-img-top" alt={`${user.first_name} ${user.last_name}`} />
              <div className="card-body">
                <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                <div className="d-flex justify-content-between">
                  <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index+1} className={`page-item ${page === index+1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPage(index+1)}>{index+1}</button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UsersList;
