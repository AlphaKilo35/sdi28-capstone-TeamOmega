import { useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData.jsx';

const Training_Status = () => {
  let userId = 1;
  let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
  //let userData = ["1", "bob"]
  console.log(userData.dataObject);

  let renderUserData = () => {
    if (!userData|| userData.length === 0 ) return <p>No User Data Found</p>
    return (
      <>
        <ul className="training-event-list">
          {Object.entries(userData.dataObject).map(([key,value], index) => (
            <li key={index} className="training-event-list-item">
              {key}: {value}
            </li>
          ))}
        </ul>
      </>
    );
  };
  return (
    <>
      { userData.loading ? (<p>Loading. . .</p>) : ( renderUserData() ) }
    </>
  );
}

export default Training_Status;
/**{Object.entries(userData[0]).map(([key, value], index) => (
  <tr className="training-event-content" key={index}><td>{key}</td><td>{value}</td></tr>
))}
  */