import React from "react";

const UserTable = ({ users }) => {
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
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>{user.role}</td>
              <td className="actions">
                <button className="btn">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
