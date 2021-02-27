import React from 'react';
import PropTypes from 'prop-types';
import EmailInput from '../../components/forms/EmailInput'
import TextInput from '../../components/forms/TextInput'
import PasswordInput from '../../components/forms/PasswordInput'
import SubmitButton from '../../components/forms/SubmitButton'



function SignUp(props) {

  return (
    <>
      <div className={`container mobile-padding`}>
        <h2>Sign Up</h2>
        <h3 className="h5-font">Create an account to {props.introtext}.</h3>

        <form action={"/"} onSubmit={(e) => props.handeleSubmit(e)}>



          <div className="form-component-wrapper">
            <label htmlFor="firstname">Name</label>
            <TextInput autoComplete="name" id="firstname" value={props.firstname} onChange={(e) => props.handleNameInput(e)} required />
            {props.nameError && <p className="error-font" aria-live="polite">{props.nameError}</p>}
          </div>

          <div className="form-component-wrapper">
            <label htmlFor="lastname">Last Name <span>(Optional)</span></label>
            <TextInput autoComplete="lastname" id="lastname" value={props.lastname} onChange={(e) => props.handleLastnameInput(e)} />
            {props.lastnameError && <p className="error-font" aria-live="polite">{props.lastnameError}</p>}
          </div>


          <div className="form-component-wrapper">
            <label htmlFor="email">Email</label>
            <EmailInput autoComplete="username" id="email" value={props.email} onChange={(e) => props.handleEmailInput(e)} required />
            {props.emailError && <p className="error-font" aria-live="polite">{props.emailError}</p>}
          </div>



          <div className="form-component-wrapper">
            <label htmlFor="pass">Password (5 character minimum)</label>
            <PasswordInput autoComplete="current-password" id="pass" value={props.password} onChange={(e) => props.handlePassInput(e)} required />
            {props.passError && <p className="error-font" aria-live="polite">{props.passError}</p>}
          </div>


          <div className="form-component-wrapper">
            <label htmlFor="confirm-pass">Confirm Password</label>
            <PasswordInput autoComplete="current-password" id="confirm-pass" value={props.confirmPassword} onChange={(e) => props.handleConfirmPassInput(e)} required />
            {props.confirmPassError && <p className="error-font" aria-live="polite">{props.confirmPassError}</p>}
          </div>

          <div className="form-component-wrapper">
            <SubmitButton value={`${props.loading ? 'Creating Account...' : 'Create Account'}`} />
          </div>

        </form>
      </div>
    </>
  )

}



SignUp.propTypes = {
  introtext: PropTypes.string,
  handeleSubmit: PropTypes.func,
  name: PropTypes.string,
  handleNameInput: PropTypes.func,
  nameError: PropTypes.string,
  lastname: PropTypes.string,
  handleLastnameInput: PropTypes.func,
  lastnameError: PropTypes.string,
  email: PropTypes.string,
  handleEmailInput: PropTypes.func,
  emailError: PropTypes.string,
  password: PropTypes.string,
  handlePassInput: PropTypes.func,
  passError: PropTypes.string,
  confirmPassword: PropTypes.string,
  handleConfirmPassInput: PropTypes.func,
  confirmPassError: PropTypes.string
}


export default SignUp;