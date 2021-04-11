import React from 'react'
import PropTypes from 'prop-types'

import firebase from '../../utils/firebase/firebaseConfig'

import Modal from './Modal'


class ResetPasswordModal extends React.Component {
    state = {
        error: '',
        successReset: false
    }

    _isMounted = false;

    closeModal() {
        this.props.handleClose(this.state.successReset)
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    resetPassword(e) {
        e.preventDefault();
        console.log('clicked')
        let auth = firebase.auth();

        let emailAddress = this.props.email;

        let form = this;

        form.setState({ error: '' })


        let actionCodeSettings = { url: `https://photoatlasapp.com/` }


        this._isMounted && auth.sendPasswordResetEmail(emailAddress, actionCodeSettings)
            .then(() => {
                form.setState({ successReset: true })

            }
            ).catch(function (error) {
                form.setState({
                    error: error.message,
                    successReset: false
                })
            });
    }

    render() {

        return (
            <Modal
                modalId='reset-password-modal'
                modalTitle={"Reset Password"}
                isOpen={this.props.isOpen}
                handleClose={() => this.closeModal()}
            >

                <div className="modal-content-padding center-text">

                    {!this.state.error && !this.state.successReset &&
                        <>
                            <h3 className="h5-font">Are you sure you want to reset your password?</h3>
                            <ul className="button-group">
                                <li><button onClick={(e) => this.resetPassword(e)} className="default-button">Reset Password</button></li>
                                <li><button onClick={() => this.closeModal()} className="button-link">Cancel</button></li>
                            </ul>
                        </>
                    }
                    {this.state.error &&
                        <p className="error-font" aria-live="polite">
                            {this.state.error}
                        </p>
                    }
                    {this.state.successReset &&
                        <div aria-live="polite">
                           <h3 className="h5-font">Check your email to reset your password.</h3> 
                        </div>}

                </div>

            </Modal>
        )
    }
}

ResetPasswordModal.propTypes = {
    email: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    logInLocation: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default ResetPasswordModal;