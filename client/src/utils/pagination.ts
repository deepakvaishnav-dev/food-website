export const getVisiblePages = (totalPages: number, currentPage: number) => {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const delta = 1;
  pages.push(1);
  const start = Math.max(2, currentPage - delta);
  const end = Math.min(totalPages - 1, currentPage + delta);
  if (start > 2) {
    pages.push("...");
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < totalPages - 1) {
    pages.push("...");
  }
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  return pages;
};
