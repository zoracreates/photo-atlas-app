import firebase from './firebase/firebaseConfig';

let addToBookmarks = (userId, tripId, tripAuthor, tripPrivacy, callback) => {
    let database = firebase.database();

    database.ref(`userBookmarks/${userId}/${tripId}`).set({
        tripPrivacy: tripPrivacy,
        tripAuthor: tripAuthor
    }).catch((error) => {
        callback(error.message)
    }).then(() => {

        callback(false)

    }

    )

}

export default addToBookmarks;