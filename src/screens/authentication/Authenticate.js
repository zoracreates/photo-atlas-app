import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../utils/firebase/firebaseConfig'

import SignIn from './SignIn'



class Authenticate extends React.Component {

  state = {
    email: '',
    password: '',
    emailError: '',
    passError: ''
  }



  handeleSubmit(e) {

    e.preventDefault();
    this.setState({
      emailError: '',
      passError: ''
    })


    let email = this.state.email;
    let password = this.state.password;
    let component = this;


    firebase.auth().fetchSignInMethodsForEmail(email).then(
      signInMethods => {
        if (signInMethods.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {

          firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
              var errorCode = error.code;
              if (errorCode === "auth/too-many-requests") {
                component.setState({ passError: "Too many sign in attempts, reset password or try again later." })
              }
              else {
                component.setState({ passError: "Invalid password" })
              }
            });
        }

        else {
          this.setState({ emailError: "Couldn't find an account with that email." })
        }

      }
    )


  }

  handleEmailInput(e) {
    this.setState({ email: e.target.value })
  }

  handlePassInput(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    let logInLocation = this.props.logInLocation;

    let trips = 'trips'
    let add = 'add'
    let profile = 'profile'


    let text;

    switch (logInLocation) {
      case trips:
        text = "view your trips"
        break;
      case add:
        text = "add a location"
        break;
      case profile:
        text = "view your profile information"
        break;
      default:
        text = "continue your PhotoAtlas journey"
    }

    return (
      <>
        <SignIn 
            introtext={text}
            handeleSubmit={(e) => this.handeleSubmit(e)}
            email={this.state.email}
            handleEmailInput={(e) => this.handleEmailInput(e)}
            emailError={this.state.emailError}
            password={this.state.password}
            handlePassInput={(e) => this.handlePassInput(e)}
            passError={this.state.passError}
        />
      </>
    )

  }

}

Authenticate.propTypes = {
  logInLocation: PropTypes.string
}


export default Authenticate;