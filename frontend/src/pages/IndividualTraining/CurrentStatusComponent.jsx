import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData.jsx';

const Training_Status = () => {
  //const [pageLoad, setPageLoad] = useState(true);
  const [userId, setUserId] = useState(17) //setUserId(a context, or from the seesion cookie)

  let headers = ["status","date_time","airframe","type_load","type_tod","departure_name", "drop_zone_name"]

  //needs refactored to be a useContext from the IndividualTrainingData Page
  //let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
  let jumpData = useFetchData(`http://localhost:3000/manifests/${userId}`)


  // useEffect( () => {
  //   console.log(jumpData.dataObject)
  // }, [jumpData.loading]);


  let renderUserData = () => {
    //if (!userData|| userData.length === 0 ) return <p>No User Data Found</p>
    let tableHeaders = Object.keys(jumpData.dataObject[0]).filter(key => headers.includes(key));

    let formatTableHeader = (key) => {
      return key
        .replace(/_/g,' ')
        .replace(' name', '')
        .replace('type ', '')
        .replace('tod', "Day/Night")
        .replace(/\b\w/g, char => char.toUpperCase())
    }

    let completedTraining = jumpData.dataObject
      .filter(item => item.status !== 'scratched' && item.status !== 'schedule');
    let scheduledTraining = jumpData.dataObject
      .filter(item => item.status !== 'scratched' && item.status !== 'complete');
    return (
      <div className="bg-white p-6 shadow-lg rounded-lg w-full min-w-full max-h-[650px]">
        <div className='overflow-x-auto'>
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Training Table</h4>
        <table className="min-w-full border-collapse">
          <thead>
            <h4>Completed Training</h4>
            <tr className="bg-gray-200">
              { tableHeaders.map( (header) => ( <th key={header} className='p-2 text-left border'>{formatTableHeader(header)}</th> )) }
            </tr>
          </thead>
          <tbody className="completed-training-table-body">
            {completedTraining.map( (row, index) => (
              <tr key={index}>
                {tableHeaders.map( (header) => (
                  <td key={header} className='p-2 border'>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <thead><h4>Upcoming Training</h4></thead>
          <tbody className="scheduled-training-table-body">
            {scheduledTraining.map( (row, index) => (
              <tr key={index}>
                {tableHeaders.map( (header) => (
                  <td key={header} className='p-2 border'>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
  };
  return (
    <div className="w-full p-6">
      { jumpData.loading ? (<p>Loading. . .</p>) : ( renderUserData() ) }
    </div>
  );
};

export default Training_Status;