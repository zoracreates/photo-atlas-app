import React from 'react'
import PropTypes from 'prop-types';
import firebase from '../../utils/firebase/firebaseConfig'


class VerifyEmail extends React.Component {

    state = {
        error: null
    }

    componentDidMount() {

        let user = firebase.auth().currentUser;
        let component = this;

        let actionCodeSettings = {
            url: `https://photoatlasapp.com/`
        };

        if (user) {

            user.sendEmailVerification(actionCodeSettings)
                .catch(function (error) {
                    component.setState({ error: `${error}` })
                });

        }

    }

    renderContent() {
        if (!this.state.error) {
            return (
                <>
                    {this.props.tabContent ? 
                        <h3 className="h4-font">Just one more step</h3> :
                        <h2 className="h4-font">Just one more step</h2>}
                    <p>
                        We've sent a verification link to your email.<br />
                        Please check your inbox to verify your account.
                    </p>

                    <h3 className="h6-font">
                        Need a new link?
                    </h3>

                    <button className="button-link">Re-Send Link</button>

                </>

            )
        }
        else {
            return (
                <>
                    <h2 className="h4-font">Sorry, there was a problem</h2>
                    <p className="error-font">{this.state.error}</p>
                    <p>
                        Please contact support at photoatlasapp@gmail.com.
                </p>
                </>
            )
        }
    }

    render() {
        return (
            <>
                <div className={`container mobile-padding`}>
                    {this.renderContent()}
                    <button className="secondary-button back-button"
                        onClick={
                            () => {
                                firebase.auth().signOut()
                            }
                        }>
                        Back to Sign In
                    </button>
                </div>
            </>
        )
    }
}

VerifyEmail.propTypes = {
    logInLocation: PropTypes.string,
    tabContent: PropTypes.bool
}

export default VerifyEmail;