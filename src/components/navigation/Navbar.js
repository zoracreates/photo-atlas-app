import { Link, useLocation } from 'react-router-dom';

import logo from '../../images/icons/nav-logo.png'

function Navbar() {

    // Check Router's location to set active status
    let location = useLocation().pathname;

    let tripsPath = new RegExp('/trips/?');
    let accountPath = new RegExp('/account/?');
    let tripPagePath = new RegExp('/trip/?');
    let locationPagePath = new RegExp('/location/?');

    let tripsActive = tripsPath.test(location);
    let accountActive = accountPath.test(location);
    let tripPageActive = tripPagePath.test(location)
    let locationPageActive = locationPagePath.test(location)

    let exploreActive = (!tripsActive && !accountActive && !tripPageActive && !locationPageActive );
    

    return (
        <header>
            <div className={`container`}>
                <div className={`logo`}>
                    <Link to="/">
                        <h1>Photo Atlas</h1>
                        <img src={logo} alt={`PhotoAtlas logo`} />
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" className={`explore ${exploreActive ? 'active' : 'normal'}`}>
                                <span>Explore</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/trips" className={`trips ${tripsActive ? 'active' : 'normal'}`}>
                                <span>Trips</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/account" className={`profile ${accountActive ? 'active' : 'normal'}`}>
                                <span>Account</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;