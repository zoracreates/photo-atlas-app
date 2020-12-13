import logo from './images/icons/nav-logo.png';
import exploreIcon from './images/icons/96px/search-white.png';
import tripsIcon from './images/icons/96px/trips-outline-white.png';
import addIcon from './images/icons/96px/add-outline-white.png';
import profileIcon from './images/icons/96px/profile-outline-white.png';
import './styles/main.scss';


function App() {
  return (
    <>
      <nav>
        <div className={`container`}>
          <div className={`logo`}>
            <img src={logo} alt={`Photo Atlas logo`}/>
          </div>
          <ul>
            <li>
              <img src={exploreIcon} alt/>
              <span>Explore</span>
            </li>

            <li>
              <img src={tripsIcon} alt/>
              <span>Trips</span>
            </li>
            <li>
              <img src={addIcon} alt/>
              <span>Add</span>
            </li>
            <li>
              <img src={profileIcon} alt/>
              <span>Profile</span>
            </li>
          </ul>
        </div>
      </nav>
      <header>
        <div className={`container`}>
          header
        </div>
      </header>
      <main>
        <div className={`container`}>
          main
        </div>
      </main>


    </>
  );
}

export default App;
