import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search by name, email, role"
        className="search-inp"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
