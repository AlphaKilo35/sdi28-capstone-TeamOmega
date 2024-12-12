import React from 'react'
import StatusSelector from './StatusSelector'
export default function ManifestList({ manifestJumpers, removeFromManifest, manifestStatus, updateStatus, totalSeats }) {

    return (
    <div className="border border-gold-400 p-4">
    <h2 className="font-bold p-2 text-center text-2xl">Flight Manifest</h2>
    <div className= "flex justify-center">
    <StatusSelector manifestStatus={manifestStatus} updateStatus={updateStatus} />
    </div>
    <div className="mt-2 font-bold mb-4 text-center">
      Available Seats: {totalSeats - manifestJumpers.length} / {totalSeats}
    </div>
    {manifestJumpers.map((jumper) => (
      <div
        key={`manifest-${jumper.manifest_id}`}
        className="flex justify-between p-2 border border-gold-400"
      >
        <div>
          {jumper.name} {jumper.jm && <span className="font-bold"> (JM)</span>}
          <div className="text-gray-500">{jumper.unit}</div>
        </div>
        <button
          onClick={() => removeFromManifest(jumper)}
          className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gold-600 sm:ml-3 sm:w-auto"
        >
          remove
        </button>
      </div>
    ))}
  </div>
  )
}
