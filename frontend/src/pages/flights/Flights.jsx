import React, {useEffect, useState} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {useNavigate} from 'react-router-dom'



const Flights = () =>{
  const navigate = useNavigate();
  const [flightToDelete, setFlightToDelete] = useState(undefined)
  const [departureAirfieldList, setDepartureAirfieldList] = useState(undefined)
  const [dropzoneList, setDropzoneList] = useState(undefined)
  const [flightList, setFlightList] = useState(undefined)
  const [open, setOpen] = useState(false)
  const [newAirframe, setNewAirframe] = useState()
  const [newNumberOFJumpers, setNewNumberOFJumpers] = useState()
  const [newDropzone, setNewDropzone] = useState()
  const [newDepartureAirfield, setNewDepartureAirfield] = useState()
  const [newDateTime, setNewDateTime] = useState()

  const newAirframeEntry = () => {
    setNewAirframe(event.target.value)
  }
  const newNumberOFJumpersEntry = () => {
    setNewNumberOFJumpers(event.target.value)
  }
  const newDropzoneEntry = () => {
    setNewDropzone(event.target.value)
    console.log(newDropzone)
  }
  const newDepartureAirfieldEntry = () => {
    setNewDepartureAirfield(event.target.value)
    console.log(newDepartureAirfield)
  }
  const newFLightDateEntry = () => {
    setNewDateTime(new Date(event.target.value).toISOString())
  }

  const deleteFlight =() =>{
    setFlightToDelete(event.target.value)
  }
  useEffect(()=>{
    fetch(`http://localhost:3000/flights/${flightToDelete}`, {
      method: "DELETE"
    })
    .then(()=>console.log("deleted"))
  }, [flightToDelete])
  useEffect(() =>{
    fetch("http://localhost:3000/flights")
      .then((res) => res.json())
      .then((data) => setFlightList(data));
  }, [flightList])

  useEffect(()=>{
    fetch("http://localhost:3000/flights/dropzones")
    .then((res) => res.json())
    .then((data) => setDropzoneList(data))
  }, [])

  useEffect(()=>{
    fetch("http://localhost:3000/flights/departureAirfields")
    .then((res) => res.json())
    .then((data) => setDepartureAirfieldList(data))
    .then(()=> console.log(departureAirfieldList))
  }, [])

  const addFlight = () => {
    const newFlight = {
      airframe: newAirframe,
      number_pax: newNumberOFJumpers,
      departure_id: newDepartureAirfield,
      drop_zone_id: newDropzone,
      date_time: newDateTime
      }
      console.log(newFlight)
    fetch("http://localhost:3000/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFlight)
    })
    .then(() => setOpen(false))
  }

  const toManifest =(event) =>{
    let selectedFlightId = event.target.closest('tr').id
    let seatsOfSelectedFlight = document.querySelector(`#flight${selectedFlightId}`).innerHTML
    const flightInfo = {flight_id: selectedFlightId, numberOfSeats:  seatsOfSelectedFlight}
    navigate("/manifest", {state: flightInfo})
  }


  if(flightList === undefined && dropzoneList === undefined && departureAirfieldList === undefined)
  {
    return(
      <>
      <h1>Still Loading...</h1>
      </>
    )
  }
  if(flightList != undefined && dropzoneList != undefined && departureAirfieldList !== undefined){
  return (
    <>
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <header className="bg-gray-800 text-gold-400 p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Flight Tracker</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex w-full justify-center rounded-md bg-gold-600  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Add flight
        </button>
      </header>

      <main className="p-6">
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-left bg-gray-900 rounded-lg">
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
            <tbody>
              {flightList.map((flight) => {
                return (
                  <>
                  <tr className="border-t border-gold-400 hover:bg-gray-800" id = {flight.flight_id} onClick = {()=>{toManifest(event)}}>
                  <td className="py-4 px-6">{flight.airframe}</td>
                  <td className="py-4 px-6" id = {`flight${flight.flight_id}`}>{flight.number_pax}</td>
                  <td className="py-4 px-6">{flight.drop_zone_name}</td>
                  <td className="py-4 px-6">{flight.departure_name}</td>
                  <td className="py-4 px-6">{flight.date_time.slice(0, 10)}</td>
                  <td className="py-4 px-6">{flight.date_time.slice(11, 16).replace(/:/g,'')}</td>
                </tr>
                <button type="button" onClick={deleteFlight}
                className="inline-flex w-full justify-center rounded-md bg-gold-600  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                value = {flight.flight_id}>
                Remove Flight
              </button>
              </>
                )})}
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gold-400">
                    Add Flight
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Fill out the following info to add a flight
                    </p>
                    <input type="text" className="form-input rounded-full px-4 py-3" placeholder = "Airframe" onChange = {newAirframeEntry}/>
                    <input type="text" className="form-input rounded-full px-4 py-3" placeholder = "Number of Jumpers" onChange = {newNumberOFJumpersEntry}/>
                    <select className="form-input rounded-full px-4 py-3" placeholder = "Dropzone" onChange = {newDropzoneEntry}>
                    <option value = 'null'>---Select a Dropzone---</option>
                      {dropzoneList.map((dropzone) =>{
                        return(
                        <option value = {dropzone.id}>{dropzone.dropzone_name}</option>
                      )})}
                    </select>
                    <select className="form-input rounded-full px-4 py-3" placeholder = "Departure Airfield" onChange = {newDepartureAirfieldEntry}>
                    <option value = 'null'>---Select a Departure Airfield---</option>
                      {departureAirfieldList.map((departureairfield) =>{
                        return(
                        <option value = {departureairfield.id}>{departureairfield.departure_name}</option>
                      )})}
                    </select>
                    <input type="datetime-local" className="form-input rounded-full px-4 py-3" placeholder = "Date" onChange = {newFLightDateEntry}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={addFlight}
                className="inline-flex w-full justify-center rounded-md bg-gold-600  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </>
  );
};
}

export default Flights;



