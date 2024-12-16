import React from 'react'
import SearchBar from './SearchBar'

export default function AvailableJumpers({ 
  filteredJumpers, 
  addToManifest, 
  totalSeats, 
  manifestJumpers, 
  search, 
  setSearch,
  userData
}) {

  const isAdmin = userData && userData.role.toLowerCase() === 'admin';
  
  return (
    <div className="border border-gold-400 p-4 ">
    <h2 className="font-bold p-2 text-center text-2xl ">Available Jumpers</h2>
    <SearchBar search={search} setSearch={setSearch} />
    <div>
      {filteredJumpers.map((jumper) => (
        <div
          key={`available-${jumper.id}`}
          className="flex justify-between p-2 border border-gold-400"
        >
          <div>
            {jumper.name} {jumper.jm && <span className="font-bold"> (JM)</span>}
            <div className="text-gray-500">{jumper.unit}</div>
          </div>
        {isAdmin &&(
          <button
            onClick={() => addToManifest(jumper)}
            disabled={manifestJumpers.length >= totalSeats}
            className="inline-flex w-full justify-center rounded-md bg-gold-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            add
          </button>
        )}
        </div>
      ))}
    </div>
  </div>
  )
}
