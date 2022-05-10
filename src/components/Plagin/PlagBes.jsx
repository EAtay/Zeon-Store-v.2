import React from "react";

const PaginBest = ({ bestsellerPerPage, totalCounris, paginatee }) => {
  const pageNumbere = [];
  for (let i = 1; i <= Math.ceil(totalCounris / bestsellerPerPage); i++) {
    pageNumbere.push(i);
  }
  return (
    <div className="button_pagination">
      {pageNumbere.map((nubmer) => (
        <div key={nubmer} className="button_pagination_block">
          <button
            onClick={() => paginatee(nubmer)}
            className="button_pagination_render"
          >
            {nubmer}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaginBest;
