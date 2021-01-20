import Navbar from './components/navigation/Navbar';
import AddLocation from './screens/AddLocation';
import Explore from './screens/explore/Explore';
import Profile from './screens/Profile';
import Trips from './screens/trips/Trips';
import LogIn from './screens/authentication/LogIn';
import PrivateRoute from './components/navigation/PrivateRoute';
import './styles/main.scss';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

function App({userAuth}) {
  return (
    <>

      <Navbar />

      <main>
        <div className={`container`}>
          <Switch>
            <Route exact path="/" component={Explore}/>
            <PrivateRoute path="/trips" component={Trips} isAuthenticated={userAuth}/> 
            <PrivateRoute path="/add" component={AddLocation} isAuthenticated={userAuth}/> 
            <PrivateRoute path="/profile" component={Profile} isAuthenticated={userAuth}/>
            <Route path="/login" component={LogIn}/> 
          </Switch>
        </div>
      </main>
      
      <footer>
        <div className={`container`}>
          <p>&copy; PhotoAtlas 2021</p>
          <p className={`caption`}>
            All photographs and their titles/metadata on PhotoAtlas are copyrighted and owned by 
            their respective owners (the photographers) and not by PhotoAtlas. As such Photo Atlas does 
            not grant any licenses to any copyrights, patents or any other intellectual property rights.
          </p>
        </div>
      </footer>
      
    </>
  );
}

App.propTypes = {
  authState: PropTypes.bool.isRequired
}

export default App;
