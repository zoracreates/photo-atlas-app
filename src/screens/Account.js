
import React from 'react'
import firebase from '../utils/firebase/firebaseConfig'
import ResetPasswordModal from '../components/modals/ResetPasswordModal'
import ChangeDisplayNameModal from '../components/modals/ChangeDisplayName'


class Account extends React.Component {

    state = {
        displayName: '',
        email: '',
        successReset: false,
        resetPassword: false,
        changeName: false
    }


    _isMounted = false;



    componentDidMount() {
        this._isMounted = true;
        this.updateUser();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    openPasswordModal() {
        this.setState({ resetPassword: true })
    }

    closePasswordModal() {
        this.setState({ resetPassword: false })
    }

    openDisplayNameModal() {
        this.setState({ changeName: true })
    }

    closeDisplayNameModal() {
        this.setState({ changeName: false })
    }

    updateUser() {

        let component = this;

        if (this._isMounted) {

            let user = firebase.auth().currentUser;
            let userId = user.uid;

            if (userId) {
                let database = firebase.database();
                

                database.ref(`users/${userId}`).get().then(function(snapshot) {
                    if (snapshot.exists()) {
                      console.log(user.email); 
                      
                      
                      let displayName = snapshot.val().displayName;
                        let email =  user.email;
                      


                      component.setState({
                        displayName: displayName,
                        email: email
                    })
                    }
                    else {
                      console.log("No data available");
                    }
                  }).catch(function(error) {
                    console.error(error);
                  });

                

            }
        }
    }

    render() {

        return (
            <>
                <div className={`container trips mobile-padding`}>
                    <h2>Account Settings</h2>
                    <ul className="settings-list">
                        <li aria-live="polite">
                            Display Name: {this.state.displayName}
                            <button onClick={() => this.openDisplayNameModal()}className="secondary-button">Change Display Name</button>
                        </li>
                        <li>
                            <p>Email: {this.state.email}</p>
                        </li>
                        <li>
                            Password: **** <button onClick={() => this.openPasswordModal()} className="secondary-button">Reset Password</button>
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
                    handleClose={() => this.closePasswordModal()}
                    logInLocation="account"
                    isOpen={this.state.resetPassword}
                />

                <ChangeDisplayNameModal
                    handleClose={() => this.closeDisplayNameModal()}
                    isOpen={this.state.changeName}
                    triggerUpdate={()=>this.updateUser()}
                />

            </>
        )

    }
}

export default Account;