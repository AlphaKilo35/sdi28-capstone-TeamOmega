import React from 'react'

//reusable dropdown component. currently it will trigger a patch request to update the status column in the manifest_tbl via the main manifest.jsx

export default function StatusSelector({manifestStatus, updateStatus, userData}) {

  const isAdmin = userData && userData.role.toLowerCase() === 'admin';


  return (
    <div className="flex gap-2 items-center">
    <div className=" mt-1">Flight Status</div>
    
    <select
      value={manifestStatus}
      onChange={(e) => updateStatus(e.target.value)}
      disabled={!isAdmin}
      className="px-2 py-1 border rounded text-gray-900 "
    >
      <option value="schedule">Scheduled</option>
      <option value="scratched">Scratched</option>
      <option value="complete">Complete</option>
    </select>
  </div>
  )
}
