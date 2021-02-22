import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../utils/firebase/firebaseConfig'
import EmailInput from '../../components/forms/EmailInput'
import PasswordInput from '../../components/forms/PasswordInput'
import SubmitButton from '../../components/forms/SubmitButton'



class SignIn extends React.Component {

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
        <div className={`container mobile-padding`}>
          <h2>Sign In</h2>
          <h3 className="h5-font">Sign in to {text}.</h3>

          <form action={"/"} onSubmit={(e) => this.handeleSubmit(e)}>

            <div className="form-component-wrapper">
              <label htmlFor="eamil" >Email</label>
              <EmailInput autoComplete="username" id="email" value={this.state.email} onChange={(e) => this.handleEmailInput(e)} required />
              {this.state.emailError && <p className="error-font" aria-live="polite">{this.state.emailError}</p>}
            </div>

            <div className="form-component-wrapper">
              <label htmlFor="pass">Password</label>
              <PasswordInput autoComplete="current-password" id="pass" value={this.state.password} onChange={(e) => this.handlePassInput(e)} required />
              {this.state.passError && <p className="error-font" aria-live="polite">{this.state.passError}</p>}
            </div>

            <div className="form-component-wrapper">
              <SubmitButton value="Sign In" />
            </div>

            <div className="form-component-wrapper">
              <button className="button-link">Create an Account</button>
            </div>

          </form>
        </div>
      </>
    )

  }

}

SignIn.propTypes = {
  logInLocation: PropTypes.string
}


export default SignIn;