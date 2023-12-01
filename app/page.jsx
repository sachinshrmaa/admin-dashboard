"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import UserTable from "../components/UserTable";

const getUsers = async () => {
  try {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const usersData = await getUsers();
      setUsers(usersData);
    }

    fetchData();
  }, []);

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

  return (
    <div className="container">
      <header className="header">
        <form>
          <input
            type="text"
            placeholder="Search"
            className="search-inp"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <button className="btn btn-danger">
          <i className="bi bi-trash"></i>
        </button>
      </header>

      <main>
        <UserTable users={filteredUsers} />
      </main>

      <Footer />
    </div>
  );
}
