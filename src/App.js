import { Switch, Route } from 'react-router-dom';
import React from 'react';
import firebase from './utils/firebase/firebaseConfig'

import Navbar from './components/navigation/Navbar';
import Home from './screens/explore/Home';
import SearchResults from './screens/explore/SearchResults';
import Account from './screens/Account';
import Trips from './screens/trips/Trips';
import PrivateRoute from './components/navigation/PrivateRoute';
import Footer from './components/content/Footer';
import Location from './screens/location/Location';
import TripContent from './screens/trips/TripContent';
import './styles/main.scss';


class App extends React.Component {

  state = {
    signedIn: false,
    userVerified: false,
    userId: null

  }



  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {


      if (user) {
        this.setState({
          signedIn: true,
          userVerified: user.emailVerified,
          userId: user.uid
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

            <Route path="/location"

              render={
                (props) => <Location {...props} userId={this.state.userId} />

              } />

            <Route path="/trips"

              render={
                (props) => <Trips {...props} userId={this.state.userId} isAuthenticated={signedIn} isVerified={userVerified} />

              } />

            <Route path="/trip"

              render={
                (props) => <TripContent {...props} userId={this.state.userId} />

              } />

            <PrivateRoute path="/account" component={Account} isAuthenticated={signedIn} isVerified={userVerified} logInLocation={"account"} />


          </Switch>


        </main>

        <Footer />

      </>
    );
  }
}



export default App;
