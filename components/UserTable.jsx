"use client";
import React, { useState } from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  const [editedUser, setEditedUser] = useState(null);

  const handleEdit = (user) => {
    setEditedUser(user);
    onEdit(user); // You can handle this function in the parent component to update the user data
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
  };

  const handleDelete = (user) => {
    onDelete(user); // You can handle this function in the parent component to delete the user
  };

  const handleSave = () => {
    setEditedUser(null);
  };

  const handleInputChange = (e, field, user) => {
    e.preventDefault();

    const updatedUser = { ...editedUser, [field]: e.target.value };
    setEditedUser(updatedUser);
  };

  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editedUser === user ? (
                  <input
                    value={editedUser.name}
                    onChange={(e) => handleInputChange(e, "name", editedUser)}
                    className="inp-field"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editedUser === user ? (
                  <input
                    value={editedUser.email}
                    onChange={(e) => handleInputChange(e, "email", editedUser)}
                    className="inp-field"
                  />
                ) : (
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                )}
              </td>
              <td>
                {editedUser === user ? (
                  <input
                    value={editedUser.role}
                    onChange={(e) => handleInputChange(e, "role", editedUser)}
                    className="inp-field"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="actions">
                {editedUser === user ? (
                  <>
                    <button className="btn btn-success" onClick={handleSave}>
                      <i class="bi bi-check-lg"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleCancelEdit}
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn" onClick={() => handleEdit(user)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

