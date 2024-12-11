import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData.jsx';

const Training_Status = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [userId, setUserId] = useState(3)
  let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
  let jumpData = useFetchData(`http://localhost:3000/manifests/${userId}`)


  useEffect( () => {
    //console.log(jumpData)
    if (!jumpData.loading) { setPageLoad(false); }
  }, []);

  //if (!jumpData || !userData) { return <p>Loading...</p>;}


  let renderUserData = () => {

    //console.log('Headers:',tableHeaders)
    if (!userData|| userData.length === 0 ) return <p>No User Data Found</p>
    let tableHeaders = Object.keys(jumpData.dataObject[0]);
    return (
      <div className="bg-white p-6 shadow-lg rounded-lg w-full min-w-full max-h-[650px]">
        <div className='overflow-x-auto'>
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Training Table</h4>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              { tableHeaders.map( (header) => ( <th key={header} className='p-2 text-left border'>{header}</th> )) }
            </tr>
          </thead>
          <tbody>
            {jumpData.dataObject.map( (row, index) => (
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
  console.log(jumpData)
  return (
    <div className="w-full p-6">
      { jumpData.loading ? (<p>Loading. . .</p>) : ( renderUserData() ) }
    </div>
  );
};

export default Training_Status;
/**{Object.entries(userData[0]).map(([key, value], index) => (
  <tr className="training-event-content" key={index}><td>{key}</td><td>{value}</td></tr>
))}
  */

{/* {Object.entries(userData.dataObject).map(([key,value], index) => (
            <li key={index} className="training-event-list-item">
              {key}: {value}
            </li>
          ))} */}