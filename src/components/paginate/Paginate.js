import React from 'react';
import { usePagination } from '../../hooks/usePegination/usePagination';

const Paginate = ({ totalCount, currentPage, onChangePage, pageSize }) => {
  const paginationRange = usePagination({
    totalCount,
    currentPage,
    pageSize,
  });

  if (paginationRange == null || paginationRange.length < 1) {
    return null;
  }

  return (
    <div>
      <ul className='flex gap-2'>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === 'DOTS') {
            return (
              <li
                key={'DOTS' + index}
                className='text-gray-800 p-3 rounded-full w-10 h-10 flex justify-center items-center'
              >
                ...
              </li>
            );
          }

          return (
            <li
              onClick={() => onChangePage(pageNumber)}
              className={`text-gray-800 cursor-pointer p-3 rounded-full w-10 h-10 flex justify-center items-center transition-all duration-300 hover:bg-gray-300 ${
                currentPage === pageNumber && 'bg-gray-300'
              }`}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Paginate;
// {paginates.map((num) => (
//   <li key={num} className='bg-lime-700 p-2'></li>
// ))}
