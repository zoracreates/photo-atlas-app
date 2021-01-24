import Navbar from './components/navigation/Navbar';
import AddLocation from './screens/AddLocation';
import Explore from './screens/explore/Explore';
import Profile from './screens/Profile';
import Trips from './screens/trips/Trips';
import LogIn from './screens/authentication/LogIn';
import PrivateRoute from './components/navigation/PrivateRoute';
import Footer from './components/Footer';
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
      
      <Footer/>

    </>
  );
}

App.propTypes = {
  userAuth: PropTypes.bool.isRequired
}

export default App;
