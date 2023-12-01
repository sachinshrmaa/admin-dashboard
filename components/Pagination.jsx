import React from "react";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <button
        className="btn-paginate first-page"
        type="button"
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      <button
        className="btn-paginate previous-page"
        type="button"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        &lt;
      </button>

      {pageNumbers.map((number) => (
        <button
          className={`btn-paginate ${number === currentPage ? "active" : ""}`}
          type="button"
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="btn-paginate next-page"
        type="button"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage >= Math.ceil(totalPosts / postsPerPage)}
      >
        &gt;
      </button>
      <button
        className="btn-paginate last-page"
        type="button"
        onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
        disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
