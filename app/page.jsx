"use client";
import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import getUsers from "../utils/getUsers";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      const usersData = await getUsers();
      setUsers(usersData);
    }

    fetchData();
  }, [searchQuery]);

  const filterUsers = () => {
    if (!searchQuery) {
      return users;
    }

    const searchTerm = searchQuery.toLowerCase();
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
      );
    });
  };

  const filteredUsers = filterUsers();

  // Get current posts
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <header className="header">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <p>
          Page {currentPage} 0f {Math.ceil(filteredUsers.length / usersPerPage)}
        </p>
      </header>

      <main>
        <UserTable users={currentUsers} />
      </main>

      <footer className="footer">
        <button className="btn btn-danger">
          Delete Seleceted <i className="bi bi-trash"></i>
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
