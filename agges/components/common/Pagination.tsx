import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const maxPagesToShow = 5
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let end = start + maxPagesToShow - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxPagesToShow + 1)
    }
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-6 select-none">
      <button
        className="px-3 py-2 rounded-md bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Anterior"
      >
        &lt;
      </button>
      {getPages().map((page) => (
        <button
          key={page}
          className={`px-3 py-2 rounded-md font-semibold transition-all ${
            page === currentPage
              ? 'bg-[var(--color-primary)] text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-2 rounded-md bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Siguiente"
      >
        &gt;
      </button>
    </nav>
  )
}
