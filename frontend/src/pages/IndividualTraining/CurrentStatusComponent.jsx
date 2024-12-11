import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData.jsx';

const Training_Status = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [userId, setUserId] = useState(5)
  let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
  const jumpData = useFetchData(`http://localhost:3000/manifests/${userId}`)


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
      <div className="trng-tbl-container">
        <h4>Training Table</h4>
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              { tableHeaders.map( (header) => ( <th key={header}>{header}</th> )) }
            </tr>
          </thead>
          <tbody>
            {jumpData.dataObject.map( (row, index) => (
              <tr key={index}>
                {tableHeaders.map( (header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  console.log(jumpData)
  return (
    <div className="trng-tbl-container">
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