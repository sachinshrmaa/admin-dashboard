import React from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="header">
      <SearchBar />
      <button className="btn btn-danger">
        <i className="bi bi-trash"></i>
      </button>
    </header>
  );
}
