import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserTable from "../components/userTable";

export default function Dashboard() {
  return (
    <div className="container">
      <Header />

      <main>
        <UserTable />
      </main>

      <Footer />
    </div>
  );
}
