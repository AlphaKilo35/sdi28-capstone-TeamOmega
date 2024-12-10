import React, {useEffect, useState} from 'react'

const Flights = () =>{
  const [flightList, setFlightList] = useState(undefined)

  useEffect(() =>{
    fetch("http://localhost:3000/flights")
      .then((res) => res.json())
      .then((data) => setFlightList(data));
  }, [])



  if(flightList === undefined)
  {
    return(
      <>
      <h1>Still Loading...</h1>
      </>
    )
  }
  if(flightList != undefined){
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
              {flightList.map((flight) => {
                return (
                  <tr className="border-b border-gold-400 hover:bg-gray-800">
                  <td className="py-4 px-6">{flight.airframe}</td>
                  <td className="py-4 px-6">{flight.number_pax}</td>
                  <td className="py-4 px-6">{flight.drop_zone_id}</td>
                  <td className="py-4 px-6">{flight.departure_id}</td>
                  <td className="py-4 px-6">{flight.date_time.slice(0, 10)}</td>
                  <td className="py-4 px-6">{flight.date_time.slice(11, 16).replace(/:/g,'')}</td>
                </tr>
                )})}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
}

export default Flights;



