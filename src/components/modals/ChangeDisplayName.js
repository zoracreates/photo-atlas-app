import React from 'react'
import PropTypes from 'prop-types'

import firebase from '../../utils/firebase/firebaseConfig'
import TextInput from '../forms/TextInput'
import Modal from './Modal'


class ChangeDisplayNameModal extends React.Component {
    state = {
        error: '',
        newName: '',
        currentName: '',
        loading: false
    }

    closeModal() {
        this.setState({
            confirmReset: false
        }, () => this.props.handleClose());
    }

    handleInput(e) {
        this.setState({ newName: e.target.value })
    }

    componentDidMount() {
        this._isMounted = true;
        // this.updateUser();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    updateUser() {
        if (this._isMounted) {

            let user = firebase.auth().currentUser;

            if (user) {
                this.setState({
                    currentName: user.displayName
                })
            }
        }
    }



    changeDisplayName(e) {
        e.preventDefault();
        let form = this;

        form.setState({ error: '', loading: true })

        let user = firebase.auth().currentUser;

        let newName = this.state.newName;

        

        

        //check that name and lastname does not include special characters, except for hypens
        let testString = /^[a-zA-Z][ a-zA-Z \-' -]+$/;


        if (!testString.test(newName)) {
            form.setState({ error: "Display can only contain letters, apostrophes, hypens and spaces." })
        } else {
                let database = firebase.database();

                let userId = user.uid
                

                database.ref(`users/${userId}`).update({
                    displayName: newName
                }
                   
                ).catch((error) => {
                    console.log(error)
                })
           // })
            .then(function () {
                // Update successful.
                form.props.triggerUpdate();
                form.props.handleClose()
                form.setState({loading: false})
            }).catch(function (error) {
                // An error happened.
                form.setState({error: error.message, loading: false})
            });

        }

    }

    render() {

        return (
            <Modal
                modalId='reset-password-modal'
                modalTitle={"Change Display Name"}
                isOpen={this.props.isOpen}
                handleClose={() => this.closeModal()}
            >

                <div className="modal-content-padding">


                    {this.state.error &&
                        <p className="error-font" aria-live="polite">
                            {this.state.error}
                        </p>
                    }
                    <label htmlFor="new-name">New Name</label>
                    <TextInput id="new-name" value={this.state.newName ? this.state.newName : this.state.currentName} onChange={(e) => this.handleInput(e)} />


                    <div aria-live="polite">
                        <button onClick={(e) => this.changeDisplayName(e)} className="default-button">
                            {this.state.loading ? 'Changing Name' : 'Change Display Name'}
                        </button>
                    </div>
                </div>

            </Modal>
        )
    }
}

ChangeDisplayNameModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    triggerUpdate: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default ChangeDisplayNameModal;