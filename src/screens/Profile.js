
import firebase from '../utils/firebase/firebaseConfig'


function Profile() {
    return (
        <>
            <h2>Profile</h2>
            <button className="default-button"

                onClick={
                    () => {
                        firebase.auth().signOut()
                    }
                }
            
            >Sign Out</button>
        </>
    )


}

export default Profile;