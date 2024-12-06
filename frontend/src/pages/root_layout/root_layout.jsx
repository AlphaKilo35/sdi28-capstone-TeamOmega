import { Outlet } from 'react-router-dom';

/* Import NavBar Component */
import NavBarComponent from '../../components/NavBar/NavBar.jsx'

/* Import "Global" Contexts */

/* Import "root" styling for every page. NavBar styling should be kept with componenet */
import './root_layout.css'

const Root_Layout = () => {
  return (
    //<GlobalProviders>
    <div className="layout">
      <header className="header">
        <NavBarComponent />
      </header>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default Root_Layout;