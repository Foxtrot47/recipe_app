import React from "react";

import { DOTS, usePagination } from "./usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex">
      <li
        className={`px-3 py-2 text-center my-0.5 flex align-middle rounded text-xl hover:bg-gray-500 ${
          currentPage === 1 &&
          "pointer-events-none hover:cursor-default bg-transparent"
        }`}
        onClick={onPrevious}
      >
        <div
          className={`fa-duotone fa-arrow-left ${
            currentPage === 1 && "text-gray-500"
          }`}
        />
      </li>
      {paginationRange.map((pageNumber, id) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={id}
              className="px-3 py-2 text-center my-0.5 flex align-middle rounded text-xl hover:bg-transparent hover:cursor-default"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`px-3 py-2 text-center my-0.5 flex align-middle rounded text-xl hover:bg-gray-500 ${
              pageNumber === currentPage &&
              "pointer-events-none hover:cursor-default bg-gray-600"
            }`}
            key={id}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`px-3 py-2 text-center my-0.5 flex align-middle rounded text-xl hover:bg-gray-500 ${
          currentPage === lastPage &&
          "pointer-events-none hover:cursor-default bg-transparent"
        }`}
        onClick={onNext}
      >
        <div
          className={`fa-duotone fa-arrow-right ${
            currentPage === lastPage && "text-gray-500"
          }`}
        />
      </li>
    </ul>
  );
};

export default Pagination;
