import { useState } from "react";

export default function usePagination(data, itemsPerPage = 6) {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentData,
    currentPage,
    maxPage,
    next: () => setCurrentPage((p) => Math.min(p + 1, maxPage)),
    prev: () => setCurrentPage((p) => Math.max(p - 1, 1)),
    setPage: setCurrentPage,
  };
}
