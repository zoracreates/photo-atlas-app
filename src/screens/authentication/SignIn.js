import React from 'react';
import PropTypes from 'prop-types';
import EmailInput from '../../components/forms/EmailInput'
import PasswordInput from '../../components/forms/PasswordInput'
import SubmitButton from '../../components/forms/SubmitButton'
import firebase from '../../utils/firebase/firebaseConfig'



class SignIn extends React.Component {

  state = {
    email: '',
    emailError: '',
    successReset: false,
    forgotPassword: false
  }

  handleEmailInput(e) {
    this.setState({ email: e.target.value })
  }

  togglePasswordReset(e) {
    e.preventDefault();
    this.setState({forgotPassword: !this.state.forgotPassword})
  }

  resetPassword(e) {
    e.preventDefault();

    let auth = firebase.auth();

    let emailAddress = this.state.email;

    let form = this;

    form.setState({emailError:''})

    let actionCodeSettings = { url: `https://photoatlasapp.com/` }


    auth.sendPasswordResetEmail(emailAddress, actionCodeSettings).then(() => {
        form.setState({successReset: true, forgotPassword: false, email: ''})
    } 
    ).catch(function (error) {
        form.setState({
          emailError: error.message, 
          forgotPassword: true, 
          successReset: false
        })
    });
  }


  render() {
    return (
      <>
        <div className={`container mobile-padding`}>
          <div className={this.props.hideTitle ? "hidden" : "visible"}>
            {this.props.tabContent ? <h3>Sign In</h3> : <h2>Sign In</h2>}

            {this.props.tabContent ?
              <h4 className="h5-font">Sign in to {this.props.introtext}.</h4> :
              <h3 className="h5-font">Sign in to {this.props.introtext}.</h3>}
          </div>

    
          <p className={`${this.state.successReset ? "visible" : "hidden"} success-font`} aria-live="polite">Check your email to reset your password.</p> 

          <form className={this.state.forgotPassword? 'hidden' : 'visible'} action={"/"} onSubmit={(e) => this.props.handleSubmit(e)}>

            <div className="form-component-wrapper">
              <label htmlFor="email">Email</label>
              <EmailInput autoComplete="username"
                id="email"
                value={this.props.email}
                onChange={(e) => this.props.handleEmailInput(e)} required />
              {this.props.emailError && <p className="error-font" aria-live="polite">{this.props.emailError}</p>}
            </div>

            <div className="form-component-wrapper">
              <label htmlFor="pass">Password</label>
              <PasswordInput autoComplete="current-password"
                id="pass"
                value={this.props.password}
                onChange={(e) => this.props.handlePassInput(e)} required />
              {this.props.passError && <p className="error-font" aria-live="polite">{this.props.passError}</p>}
            </div>

            <div className="form-component-wrapper">
              <SubmitButton value={`${this.props.loading ? 'Signing In...' : 'Sign In'}`} />
            </div>

          </form>

          <div className={`${this.state.forgotPassword ? 'hidden' : 'visible'} form-component-wrapper`}>
              <button
                onClick={(e) => { this.togglePasswordReset(e) }}
                className="secondary-button forgot-pass">Forgot password?</button>
            </div>

          <form className={this.state.forgotPassword ? 'visible' : 'hidden'} action={"/"}  onSubmit={(e) => this.resetPassword(e)}>
            <div className="form-component-wrapper">
              
              <label htmlFor="password-reset-email">Email</label>
              
              <EmailInput id="password-reset-email"
                value={this.state.email}

                onChange={(e) => this.handleEmailInput(e)} required />
              
                {this.state.emailError && <p className="error-font"
                aria-live="polite">
                  {this.state.emailError}
                  </p>}
            </div>
            
            <div className="form-component-wrapper">
              <SubmitButton value="Reset Password" />
            </div>
          </form>


          <div className={`${this.state.forgotPassword ? 'visible' : 'hidden'} form-component-wrapper`}>
            <button className="button-link" onClick={(e) => { this.togglePasswordReset(e) }}>
              Sign In
              </button>
          </div>


        </div>
      </>
    )

  }

}



SignIn.propTypes = {
  introtext: PropTypes.string,
  handleSubmit: PropTypes.func,
  email: PropTypes.string,
  handleEmailInput: PropTypes.func,
  emailError: PropTypes.string,
  password: PropTypes.string,
  handlePassInput: PropTypes.func,
  passError: PropTypes.string,
  tabContent: PropTypes.bool,
  hiddeTitle: PropTypes.bool,
  logInLocation: PropTypes.string
}


export default SignIn;