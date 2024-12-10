import filters from './FiltersComponent.jsx';
import useFetchData from '../../hooks/useFetchData.jsx';

//Get User ID from session cookie
let userId = null;
let userData = useFetchData('api user query endpoint');

const training_status = () => {
  //let userTraining = getUserData();
  return (
    <>
      <ul className="training-event-list">
        {userTraining.map((trngEvent, index) => (
          <li className="training-event-list-item" key={index} id={index+1} /*onClick={() => onSelectEvent(event)}*/>
            <p className="training-event-content">{trngEvent}</p>
          </li>
        ))}
      </ul>
    </>

  )
}

export default training_status;
