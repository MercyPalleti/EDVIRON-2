import React from 'react'

export default function Pagination({ page, pageSize, total, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(totalPages, page + 1))

  return (
    <div className="flex items-center gap-3">
      <button onClick={prev} className="px-2 py-1 border rounded">Prev</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={next} className="px-2 py-1 border rounded">Next</button>
    </div>
  )
}
