import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../utils/firebase/firebaseConfig'

import SignIn from './SignIn'
import SignUp from './SignUp'



class Authenticate extends React.Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        emailError: '',
        passError: '',
        confirmPassError: '',
        nameError: '',
        lastnameError: '',
        loading: false
    }

    handeleSignIn(e) {

        e.preventDefault();
        this.setState({
            emailError: '',
            passError: '',
            loading: true
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

        this.setState({loading: false})

    }


    handeleCreateAccount(e) {

        e.preventDefault();
        this.setState({
            confirmPassword: '',
            emailError: '',
            passError: '',
            confirmPassError: '',
            nameError: '',
            lastnameError: '',
            loading: true
            })


        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;

        let component = this;


        firebase.auth().fetchSignInMethodsForEmail(email).then(
            signInMethods => {
                if (signInMethods.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
                    this.setState({ emailError: "An account exist with that email." })
                }

                else {
                    //check that name and lastname does not include special characters, except for hypens
                    let testString = /^[a-zA-Z][ a-zA-Z \-' -]+$/;


                    if (!testString.test(firstname)) {
                        component.setState({ nameError: "Name can only contain letters, apostrophes, hypens and spaces." })
                    }

                    if (lastname) {
                        if (!testString.test(lastname)) {
                            component.setState({ lastnameError: "Last name can only contain letters, apostrophes, hypens and spaces." })

                        }
                    }

                    //check that name and lastname are longer than 1 character
                    if (firstname.length === 1) {
                        component.setState({ nameError: "Name must be longer than one character." })
                    }

                    if (lastname.length === 1) {
                        component.setState({ lastnameError: "Last name, if provided, must be longer than one character." })
                    }

                    //check that passworrd is longer than 5 characters
                    if (password.length < 5) {
                        component.setState({ passError: "Passowrd must be at least 5 characters long." })
                    }

                    //check that passwords match
                    if (password !== confirmPassword) {
                        component.setState({ confirmPassError: "Passwords don't match" })
                    }

                    //check that there are no errors
                    if (!this.state.emailError && !this.state.confirmPassError && !this.state.nameError && !this.state.passError) {
                        //create account

                        /* firebase.auth().METHOD()
                            .catch((error) => {
                                let errorCode = error.code;
                                let errorMessage = error.errorMessage;
                                console.log(`${errorCode} ${errorMessage}`) 
                            });*/
                    }




                }

            }
        )
            this.setState({loading: false})

    }

    handleEmailInput(e) {
        this.setState({ email: e.target.value })
    }

    handlePassInput(e) {
        this.setState({ password: e.target.value })
    }

    handleNameInput(e) {
        this.setState({ firstname: e.target.value })
    }

    handleLastnameInput(e) {
        this.setState({ lastname: e.target.value })
    }

    handleConfirmPassInput(e) {
        this.setState({ confirmPassword: e.target.value })
    }


    /*CREATE MISSING ONCHANGE HANDLERS*/

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
                {/* <SignIn
                    introtext={text}
                    handeleSubmit={(e) => this.handeleSignIn(e)}
                    email={this.state.email}
                    handleEmailInput={(e) => this.handleEmailInput(e)}
                    emailError={this.state.emailError}
                    password={this.state.password}
                    handlePassInput={(e) => this.handlePassInput(e)}
                    passError={this.state.passError}
                    loading={this.state.loading}
                /> */}

                <SignUp
                    introtext={text}
                    handeleSubmit={(e) => this.handeleCreateAccount(e)}
                    email={this.state.email}
                    handleEmailInput={(e) => this.handleEmailInput(e)}
                    emailError={this.state.emailError}
                    password={this.state.password}
                    handlePassInput={(e) => this.handlePassInput(e)}
                    passError={this.state.passError}
                    loading={this.state.loading}

                    firstname={this.state.firstname}
                    nameError={this.state.nameError}
                    handleNameInput={(e) => this.handleNameInput(e)}

                    lastname={this.state.lastname}
                    lastnameError={this.state.lastnameError}
                    handleLastnameInput={(e) => this.handleLastnameInput(e)}

                    confirmPassword={this.state.confirmPassword}
                    confirmPassError={this.state.confirmPassError}
                    handleConfirmPassInput={(e) => this.handleConfirmPassInput(e)}
                />
                {/* 
                <div className="container mobile-padding">
                    <button className="button-link">Sign In</button>
                    <button className="button-link">Create Account</button>
                </div> */}
            </>

        )

    }

}

Authenticate.propTypes = {
    logInLocation: PropTypes.string
}


export default Authenticate;