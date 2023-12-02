"use client";

import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows(users.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (userId) => {
    const newSelectedRows = [...selectedRows];
    if (selectedRows.includes(userId)) {
      newSelectedRows.splice(newSelectedRows.indexOf(userId), 1);
    } else {
      newSelectedRows.push(userId);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleDeleteSelected = () => {
    setUsers(users.filter((user) => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchText = searchQuery.toLowerCase();
    return Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchText)
    );
  });

  const handleDelete = (userToDelete) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userToDelete.id)
    );
  };

  const handleEdit = (editedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    setEditingUserId(null); // Exit edit mode after saving
  };

  const handleSaveEdit = (editedUser) => {
    // Check if any field is empty before saving
    if (!editedUser.name || !editedUser.email) {
      // You can display an error message or handle it as needed
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );

    setEditingUserId(null); // Exit edit mode after saving
  };

  const handleCancelEdit = () => {
    setEditingUserId(null); // Cancel editing and exit edit mode
  };

  // Get current posts
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="header">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-inp"
        />
        <p>
          Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}{" "}
        </p>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === filteredUsers.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleSelectRow(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={user.name}
                    className="inp-field"
                    onChange={(e) =>
                      handleEdit({ ...user, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    value={user.email}
                    className="inp-field"
                    onChange={(e) =>
                      handleEdit({ ...user, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.role}</td>
              <td className="actions">
                {editingUserId === user.id ? (
                  <>
                    <button
                      className="btn"
                      onClick={() => handleSaveEdit(user)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn"
                      onClick={() => setEditingUserId(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="footer">
        <button
          disabled={!selectedRows.length}
          onClick={handleDeleteSelected}
          className="btn btn-danger"
        >
          Delete Selected
        </button>

        <Pagination
          postsPerPage={usersPerPage}
          totalPosts={filteredUsers.length}
          paginate={paginate}
        />
      </footer>
    </div>
  );
}
