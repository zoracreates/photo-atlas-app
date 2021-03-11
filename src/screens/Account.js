
import React from 'react'
import firebase from '../utils/firebase/firebaseConfig'
import ResetPasswordModal from '../components/modals/ResetPasswordModal'


class Account extends React.Component {

    state = {
        displayName: '',
        email: '',
        successReset: false,
        resetPassword: false
    }
    

    _isMounted = false;

    

    componentDidMount() {
        this._isMounted = true;
        this.updateUser();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    openModal() {
        this.setState({resetPassword: true})
    }

    closeModal() {
        this.setState({resetPassword: false})
    }

    updateUser() {
        if (this._isMounted) {

            let user = firebase.auth().currentUser;
            

            if (user) {
                this.setState({
                    displayName: user.displayName,
                    email: user.email
                })
            }
        }
    }

    render() {

        return (
            <>
            <div className={`container trips mobile-padding`}>
                <h2>Account Settings</h2>
                <ul className="settings-list">
                    <li>
                        Display Name: {this.state.displayName}
                        <button className="secondary-button">Change Display Name</button>
                    </li>
                    <li>
                        <p>Email: {this.state.email}</p>
                    </li>
                    <li>
                        Password: **** <button onClick={()=>this.openModal()} className="secondary-button">Reset Password</button>
                    </li>
                </ul>


    
                <button className="button-link"
                    onClick={
                        () => {
                            firebase.auth().signOut()
                        }
                    }>Sign Out</button>
            </div>
            <ResetPasswordModal 
                    email={this.state.email}
                    handleClose={()=>this.closeModal()}
                    logInLocation="account"
                    isOpen={this.state.resetPassword}
            />

            </>
        )

    }
}

export default Account;