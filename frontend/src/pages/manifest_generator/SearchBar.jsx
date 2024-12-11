import React from 'react'

//reusable search bar component

export default function SearchBar({ search, setSearch }) {
  return (
    <input
    type="text"
    className="w-full border p-2 mb-4 text-gray-900"
    placeholder="Search jumpers..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  )
}
