import { Link } from 'react-router-dom';
import './nav-bar.css';

function NavBarComponent() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/flights">Flights</Link></li>
        </ul>
      </nav>
    </>

  )
}

export default NavBarComponent;