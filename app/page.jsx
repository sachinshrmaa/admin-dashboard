import React from "react";

export default function Dashboard() {
  return (
    <div className="container">
      <header className="header">
        <form>
          <input type="text" placeholder="Search" className="search-inp" />
        </form>
        <button className="btn btn-danger">
          <i class="bi bi-trash"></i>
        </button>
      </header>

      <main>
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
            <tr>
              <td>Aaron Miles</td>
              <td>
                <a href="mailto:aaron@mailinator.com">aaron@mailinator.com</a>
              </td>
              <td>member</td>
              <td className="actions">
                <button className="btn">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Aishwarya Naik</td>
              <td>
                <a href="mailto:aishwarya@mailinator.com">
                  aishwarya@mailinator.com
                </a>
              </td>
              <td>member</td>
              <td className="actions">
                <button className="btn">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Arvind Kumar</td>
              <td>
                <a href="mailto:arvind@mailinator.com">arvind@mailinator.com</a>
              </td>
              <td>admin</td>
              <td className="actions">
                <button className="btn">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer className="footer">
        <p>Page 1 0f 5</p>
        <div className="pagination">
          <button className="btn">&larr;</button>
          <button className="btn">1</button>
          <button className="btn">2</button>
          <button className="btn">&rarr;</button>
        </div>
      </footer>
    </div>
  );
}
