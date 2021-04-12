import firebase from './firebase/firebaseConfig';

let addToBookmarks = (userId, tripId, tripAuthor, tripPrivacy, callback) => {
    let database = firebase.database();
    let bookmarkingError = false
    let update = {};
    update[userId] = true;
    //add reference on 
    database.ref(`${tripPrivacy}Trips/${tripId}/bookmarks`).update(
        update
    ).catch(
        (error) => {
            bookmarkingError = error.message
        }
    ).then(() => {
        //add to user bookmarks
        database.ref(`userBookmarks/${userId}/${tripId}`).set({
            tripPrivacy: tripPrivacy,
            tripAuthor: tripAuthor
        }).catch((error) => {
            bookmarkingError = error.message
        }).then(() => {
            callback(bookmarkingError)
        })

    }

    )



}

export default addToBookmarks;