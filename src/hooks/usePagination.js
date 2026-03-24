import { useState } from 'react';

export function usePagination(totalItems, itemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  return { currentPage, setCurrentPage, totalPages, offset, itemsPerPage };
}
