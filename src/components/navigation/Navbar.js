import logo from '../../images/icons/nav-logo.png'
import exploreIcon from '../../images/icons/96px/search-white.png';
import tripsIcon from '../../images/icons/96px/trips-outline-white.png';
import addIcon from '../../images/icons/96px/add-outline-white.png';
import profileIcon from '../../images/icons/96px/profile-outline-white.png';

function Navbar () {

    return (
        <header>
            <div className={`container`}>
                <div className={`logo`}>
                    <h1>Photo Atlas</h1>
                    <img src={logo} alt={`PhotoAtlas logo`}/>
                </div>
                <nav>
                <ul>
                    <li>
                        <img src={exploreIcon} alt=""/>
                        <span>Explore</span>
                    </li>

                    <li>
                        <img src={tripsIcon} alt=""/>
                        <span>Trips</span>
                    </li>

                    <li>
                        <img src={addIcon} alt=""/>
                        <span>Add</span>
                    </li>

                    <li>
                        <img src={profileIcon} alt=""/>
                        <span>Profile</span>
                    </li>
                </ul>
                </nav>
            </div>
    </header>
    )
}

export default Navbar;