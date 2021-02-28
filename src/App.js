import { Switch, Route } from 'react-router-dom';
import React from 'react';
import firebase from './utils/firebase/firebaseConfig'

import Navbar from './components/navigation/Navbar';
import AddLocation from './screens/AddLocation';
import Home from './screens/explore/Home';
import SearchResults from './screens/explore/SearchResults';
import Profile from './screens/Profile';
import Trips from './screens/trips/Trips';
import PrivateRoute from './components/navigation/PrivateRoute';
import Footer from './components/content/Footer';
import Location from './screens/location/Location'


import './styles/main.scss';


class App extends React.Component {

  state = {
    signedIn: false,
    userVerified: false,
  }



  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ 
          signedIn: true,
          userVerified: user.emailVerified,
        });
      } else {
        this.setState({ signedIn: false });
      }
    });
  };


  render() {

    let { signedIn, userVerified } = this.state;

    return (
      <>

        <Navbar />
        <main>

          <Switch>
            <Route exact path="/" component={Home} />
            
            <Route path="/explore" component={SearchResults} />

            <Route path="/location" component={Location} />
           
            <PrivateRoute path="/trips" component={Trips} isAuthenticated={signedIn} isVerified={userVerified} logInLocation={"trips"} />
            
            <PrivateRoute path="/add" component={AddLocation} isAuthenticated={signedIn} isVerified={userVerified} logInLocation={"add"}/>
            
            <PrivateRoute path="/profile" component={Profile} isAuthenticated={signedIn} isVerified={userVerified} logInLocation={"profile"}/>
            
          
          </Switch>


        </main>

        <Footer />

      </>
    );
  }
}



export default App;
