"use client"
import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Assuming your API endpoint for fetching users is /api/users
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={fetchUsers}
        >
          Fetch Users
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id} className="mb-2">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
