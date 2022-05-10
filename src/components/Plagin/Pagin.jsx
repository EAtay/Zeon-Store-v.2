import React from "react";

const Pagin = ({ countriesPerPage, totalCounris, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalCounris / countriesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="button_pagination">
      {pageNumber.map((nubmer) => (
        <div key={nubmer} className="button_pagination_block">
          <button
            onClick={() => paginate(nubmer)} 
            className="button_pagination_render active"
          >
            {nubmer}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pagin;
