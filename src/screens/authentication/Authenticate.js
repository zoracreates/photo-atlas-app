import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../utils/firebase/firebaseConfig'

import SignIn from './SignIn'
import SignUp from './SignUp'



class Authenticate extends React.Component {

    state = {
        newUser: false,
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

    handleSignIn(e) {

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

                    firebase.auth().signInWithEmailAndPassword(email, password).then(
                        (userCredential) => {
                            if (this.props.afterSignIn) {
                                let user = userCredential.user;
                                this.props.afterSignIn(user)
                            }
                        }
                    )
                        .catch((error) => {
                            let errorCode = error.code;
                            let errorMessage = error.message;
                            if (errorCode === "auth/too-many-requests") {
                                component.setState({ passError: "Too many sign in attempts, reset password or try again later." })
                            }
                            else if (errorCode === "auth/wrong-password") {
                                component.setState({ passError: "Invalid password" })
                            }
                            else {
                                component.setState({ passError: errorMessage })
                            }

                        });
                }

                else {
                    this.setState({ emailError: "Couldn't find an account with that email." })
                }

            }
        )

        this.setState({ loading: false })

    }


    handleCreateAccount(e) {

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
                    if (password.length < 6) {
                        component.setState({ passError: "Passowrd must be at least 6 characters long." })
                    }

                    //check that passwords match
                    if (password !== confirmPassword) {
                        component.setState({ confirmPassError: "Passwords don't match" })
                    }

                    //check that there are no errors
                    if (!this.state.emailError && !this.state.confirmPassError && !this.state.nameError && !this.state.passError) {
                        //create account
                        let displayName = firstname;

                        if (firstname && lastname) {
                            displayName = `${firstname} ${lastname}`
                        }
                        //create credentials
                        firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredential => {
                            let user = userCredential.user;
                            let userId = user.uid;
                            let email = user.email;
                        

                            //add user displayName and email to databsse
                            let userInfo = {
                                email: email,
                                displayName: displayName
                            }
                            let database = firebase.database();

                            database.ref(`users/${userId}`).set(
                                userInfo
                            ).catch((error) => {
                                console.log(error)
                            })

                            if (this.props.afterCreateAccount) {
                                let user = userCredential.user;
                                this.props.afterCreateAccount(user)
                            }

                        }

                        )
                            .catch((error) => {
                                var errorCode = error.code;
                                var errorMessage = error.message;

                                if (errorCode === "auth/email-already-in-use") {
                                    this.setState({ emailError: "An account exist with that email." })
                                }

                                if (errorCode === "auth/invalid-email") {
                                    this.setState({ emailError: "Please use a valid email address" })
                                }

                                if (errorCode === "auth/operation-not-allowed") {
                                    this.setState({ emailError: errorMessage })
                                }

                                if (errorCode === "auth/weak-password") {
                                    component.setState({ passError: "Passowrd must be at least 6 characters long." })
                                }
                            });
                    }

                }

            }
        )
        this.setState({ loading: false })

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


    changeUserType() {
        this.setState({ newUser: !this.state.newUser }, () => {
            if (this.props.changeUserOnParent) {
                this.props.changeUserOnParent(this.state.newUser)
            }
        })
    }

    renderContent(newUser) {

        let logInLocation = this.props.logInLocation;

        let trips = 'trips'
        let add = 'add'
        let account = 'account'


        let text;

        switch (logInLocation) {
            case trips:
                text = "view your trips"
                break;
            case add:
                text = "add a location"
                break;
            case account:
                text = "view your account information"
                break;
            default:
                text = "continue your PhotoAtlas journey"
        }

        if (newUser) {
            return (
                <>
                    <SignUp
                        hideTitle={this.props.hideTitle ? true : false}
                        tabContent={this.props.tabContent}
                        introtext={text}
                        handleSubmit={(e) => this.handleCreateAccount(e)}
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
                </>
            )
        }
        else {
            return (
                <>
                    <SignIn
                        hideTitle={this.props.hideTitle ? true : false}
                        tabContent={this.props.tabContent}
                        introtext={text}
                        handleSubmit={(e) => this.handleSignIn(e)}
                        email={this.state.email}
                        handleEmailInput={(e) => this.handleEmailInput(e)}
                        emailError={this.state.emailError}
                        password={this.state.password}
                        handlePassInput={(e) => this.handlePassInput(e)}
                        passError={this.state.passError}
                        loading={this.state.loading}
                        logInLocation={logInLocation}
                    />
                </>
            )
        }
    }


    render() {

        let { newUser } = this.state;

        return (
            <>

                {this.renderContent(newUser)}

                <div className="container mobile-padding">
                    <button className="button-link" onClick={() => this.changeUserType()}>
                        {newUser ? "Sign In" : "Create Account"}
                    </button>
                </div>
            </>

        )

    }

}

Authenticate.propTypes = {
    logInLocation: PropTypes.string,
    tabContent: PropTypes.bool,
    hideTitle: PropTypes.bool,
    afterSignIn: PropTypes.func,
    afterCreateAccount: PropTypes.func
}


export default Authenticate;