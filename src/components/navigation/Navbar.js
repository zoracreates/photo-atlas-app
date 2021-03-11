import { Link, useLocation } from 'react-router-dom';

import logo from '../../images/icons/nav-logo.png'

function Navbar() {

    // Check Router's location to set active status
    let location = useLocation().pathname;

    let tripsPath = new RegExp('/trips/?');
    let addPath = new RegExp('/add/?');
    let profilePath = new RegExp('/account/?');
    let logInPath = new RegExp('/login/?');

    let tripsActive = tripsPath.test(location);
    let addActive = addPath.test(location);
    let profileActive = profilePath.test(location);
    let logInActive = logInPath.test(location);
    let exploreActive = (!tripsActive && !addActive && !profileActive && !logInActive);
    

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
                            <Link to="/add" className={`add ${addActive ? 'active' : 'normal'}`}>
                                <span>Add</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/account" className={`profile ${profileActive ? 'active' : 'normal'}`}>
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