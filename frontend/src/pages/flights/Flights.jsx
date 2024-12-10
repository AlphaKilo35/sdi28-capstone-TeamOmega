import React from 'react';

const Flights = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 text-gold-400 p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Flight Tracker</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Table Section */}
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-left bg-gray-900 rounded-lg">
            {/* Table Header */}
            <thead>
              <tr className="bg-gold-600 text-gray-900">
                <th className="py-3 px-6">Airframe</th>
                <th className="py-3 px-6">Number of Jumpers</th>
                <th className="py-3 px-6">Dropzone</th>
                <th className="py-3 px-6">Departure Airfield</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Time</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {/* Example Row */}
              <tr className="border-b border-gold-400 hover:bg-gray-800">
                <td className="py-4 px-6">C-130 Hercules</td>
                <td className="py-4 px-6">30</td>
                <td className="py-4 px-6">Fort Bragg</td>
                <td className="py-4 px-6">Pope AAF</td>
                <td className="py-4 px-6">2024-12-15</td>
                <td className="py-4 px-6">14:00</td>
              </tr>
              <tr className="border-b border-gold-400 hover:bg-gray-800">
                <td className="py-4 px-6">C-17 Globemaster</td>
                <td className="py-4 px-6">50</td>
                <td className="py-4 px-6">Fort Campbell</td>
                <td className="py-4 px-6">McChord AFB</td>
                <td className="py-4 px-6">2024-12-16</td>
                <td className="py-4 px-6">16:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Flights;



