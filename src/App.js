import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from './components/navigation/Navbar';
import AddLocation from './screens/AddLocation';
import Home from './screens/explore/Home';
import SearchResults from './screens/explore/SearchResults';
import Profile from './screens/Profile';
import Trips from './screens/trips/Trips';
import LogIn from './screens/authentication/LogIn';
import PrivateRoute from './components/navigation/PrivateRoute';
import Footer from './components/Footer';

import './styles/main.scss';



function App({userAuth}) {
  return (
    <>

      <Navbar />

      <main>

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/explore" component={SearchResults}/> 
            <PrivateRoute path="/trips" component={Trips} isAuthenticated={userAuth}/> 
            <PrivateRoute path="/add" component={AddLocation} isAuthenticated={userAuth}/> 
            <PrivateRoute path="/profile" component={Profile} isAuthenticated={userAuth}/>
            <Route path="/login" component={LogIn}/> 
          </Switch>


      </main>
      
      <Footer/>

    </>
  );
}

App.propTypes = {
  userAuth: PropTypes.bool.isRequired
}

export default App;
