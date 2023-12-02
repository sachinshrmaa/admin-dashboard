"use client";

import React, { useState, useEffect } from "react";
import getUsers from "../utils/getUsers";
import Pagination from "./Pagination";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const loadedUsers = await getUsers();
      setUsers(loadedUsers);
      setLoading(false);
    }

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = searchQuery.toLowerCase();
    return Object.values(user).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchText)
    );
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Get current users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

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

  const handleDelete = (userToDelete) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userToDelete.id)
    );
  };

  const handleEdit = (editedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
  };

  const handleSaveEdit = (editedUser) => {
    if (!editedUser.name || !editedUser.email) {
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );

    setEditingUserId(null);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows(currentUsers.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div>
      <div className="header">
        <input
          type="text"
          placeholder="Search by name, email, role"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-inp"
        />

        <button
          disabled={!selectedRows.length}
          onClick={handleDeleteSelected}
          className="btn btn-danger"
        >
          Delete Selected <i className="bi bi-trash"> </i>
        </button>
      </div>
      {loading && <p className="loading">loading users...</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === currentUsers.length}
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
            <tr
              key={user.id}
              className={selectedRows.includes(user.id) ? "selected" : ""}
            >
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
                    defaultValue={user.name}
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
              <td>
                {editingUserId === user.id ? (
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleEdit({ ...user, role: e.target.value })
                    }
                    className="inp-field"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="actions">
                {editingUserId === user.id ? (
                  <>
                    <button
                      className="btn save"
                      onClick={() => handleSaveEdit(user)}
                    >
                      <i className="bi bi-check-lg"> </i>
                    </button>
                    <button className="btn" onClick={handleCancelEdit}>
                      <i className="bi bi-x-lg"> </i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn edit"
                      onClick={() => setEditingUserId(user.id)}
                    >
                      <i className="bi bi-pencil-square"> </i>
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(user)}
                    >
                      <i className="bi bi-trash"> </i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="footer">
        <span>
          Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
        </span>

        <Pagination
          paginate={paginate}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          filteredUsers={filteredUsers}
          usersPerPage={usersPerPage}
        />
      </footer>
    </div>
  );
}
