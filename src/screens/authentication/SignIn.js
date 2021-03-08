import React from 'react';
import PropTypes from 'prop-types';
import EmailInput from '../../components/forms/EmailInput'
import PasswordInput from '../../components/forms/PasswordInput'
import SubmitButton from '../../components/forms/SubmitButton'



function SignIn(props) {

  return (
    <>
      <div className={`container mobile-padding`}>
        <div className={props.hideTitle ? "hidden" : "visible"}>
          {props.tabContent ? <h3>Sign In</h3> : <h2>Sign In</h2>}

          {props.tabContent ?
            <h4 className="h5-font">Sign in to {props.introtext}.</h4> :
            <h3 className="h5-font">Sign in to {props.introtext}.</h3>}
        </div>

        <form action={"/"} onSubmit={(e) => props.handleSubmit(e)}>

          <div className="form-component-wrapper">
            <label htmlFor="email">Email</label>
            <EmailInput autoComplete="username" id="email" value={props.email} onChange={(e) => props.handleEmailInput(e)} required />
            {props.emailError && <p className="error-font" aria-live="polite">{props.emailError}</p>}
          </div>

          <div className="form-component-wrapper">
            <label htmlFor="pass">Password</label>
            <PasswordInput autoComplete="current-password" id="pass" value={props.password} onChange={(e) => props.handlePassInput(e)} required />
            {props.passError && <p className="error-font" aria-live="polite">{props.passError}</p>}
          </div>

          <div className="form-component-wrapper">
            <SubmitButton value={`${props.loading ? 'Signing In...' : 'Sign In'}`} />
          </div>

        </form>
      </div>
    </>
  )

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
  hiddeTitle: PropTypes.bool
}


export default SignIn;